import {
  ref,
  reactive,
  withKeys,
  defineComponent,
  type PropType,
  type ExtractPropTypes,
} from 'vue';

// Utils
import {
  noop,
  pick,
  extend,
  addUnit,
  truthProp,
  isFunction,
  BORDER_TOP,
  BORDER_LEFT,
  unknownProp,
  numericProp,
  makeStringProp,
  callInterceptor,
  createNamespace,
  type ComponentInstance,
} from '../utils';
import { popupSharedProps, popupSharedPropKeys } from '../popup/shared';

// Components
import { Popup } from '../popup';
import { Button } from '../button';
import { ActionBar } from '../action-bar';
import { ActionBarButton } from '../action-bar-button';

// Types
import type {
  DialogTheme,
  DialogAction,
  DialogMessage,
  DialogMessageAlign,
  FooterActions,
} from './types';

const [name, bem, t] = createNamespace('dialog');

export const dialogProps = extend({}, popupSharedProps, {
  title: String,
  theme: String as PropType<DialogTheme>,
  width: numericProp,
  message: [String, Function] as PropType<DialogMessage>,
  footerActions: Array as PropType<FooterActions[]>,
  callback: Function as PropType<(action?: DialogAction) => void>,
  allowHtml: Boolean,
  className: unknownProp,
  transition: makeStringProp('van-dialog-bounce'),
  messageAlign: String as PropType<DialogMessageAlign>,
  closeOnPopstate: truthProp,
  longText: Boolean,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  cancelButtonDisabled: Boolean,
  confirmButtonText: String,
  confirmButtonColor: String,
  confirmButtonDisabled: Boolean,
  showConfirmButton: truthProp,
  destructiveButtonText: String,
  destructiveButtonColor: String,
  destructiveButtonDisabled: Boolean,
  showDestructiveButton: Boolean,
  closeOnClickOverlay: Boolean,
});

export type DialogProps = ExtractPropTypes<typeof dialogProps>;

const popupInheritKeys = [
  ...popupSharedPropKeys,
  'transition',
  'closeOnPopstate',
] as const;

type Loading = {
  [key: string]: boolean;
};

export default defineComponent({
  name,

  props: dialogProps,

  emits: [
    'confirm',
    'cancel',
    'destructive',
    'default',
    'keydown',
    'update:show',
  ],

  setup(props, { emit, slots }) {
    const root = ref<ComponentInstance>();
    const loading = reactive<Loading>({
      default: false,
      confirm: false,
      cancel: false,
      destructive: false,
    });

    const updateShow = (value: boolean) => emit('update:show', value);

    const close = (action: DialogAction) => {
      updateShow(false);
      props.callback?.(action);
    };

    const getActionHandler =
      (action: DialogAction, loadingUnique: string, emitEvent = true) =>
      () => {
        // should not trigger close event when hidden
        if (!props.show) {
          return;
        }
        if (emitEvent) {
          emit(action);
        }

        if (props.beforeClose) {
          loading[loadingUnique] = true;
          callInterceptor(props.beforeClose, {
            args: [action],
            done() {
              close(action);
              loading[loadingUnique] = false;
            },
            canceled() {
              loading[loadingUnique] = false;
            },
          });
        } else {
          close(action);
        }
      };

    const onCancel = getActionHandler('cancel', 'cancel');
    const onConfirm = getActionHandler('confirm', 'confirm');
    const onDestructive = getActionHandler('destructive', 'destructive');
    const onKeydown = withKeys(
      (event: KeyboardEvent) => {
        // skip keyboard events of child elements
        if (event.target !== root.value?.popupRef?.value) {
          return;
        }

        const onEventType: Record<string, () => void> = {
          Enter: props.showConfirmButton
            ? onConfirm
            : props.showDestructiveButton
            ? onDestructive
            : noop,
          Escape: props.showCancelButton ? onCancel : noop,
        };

        onEventType[event.key]();
        emit('keydown', event);
      },
      ['enter', 'esc'],
    );

    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title;
      if (title) {
        return (
          <div
            class={bem('header', {
              isolated: !props.message && !slots.default,
            })}
          >
            {title}
          </div>
        );
      }
    };

    const renderMessage = (hasTitle: boolean) => {
      const { message, allowHtml, messageAlign, longText } = props;

      const classNames = bem('message', {
        'has-title': hasTitle,
        'long-text': longText,
        [messageAlign as string]: messageAlign,
      });

      const content = isFunction(message) ? message() : message;

      if (allowHtml && typeof content === 'string') {
        return <div class={classNames} innerHTML={content} />;
      }

      return <div class={classNames}>{content} </div>;
    };

    const renderContent = () => {
      if (slots.default) {
        return <div class={bem('content')}>{slots.default()}</div>;
      }

      const { title, message, allowHtml, longText } = props;
      if (message) {
        const hasTitle = !!(title || slots.title);
        return (
          <div
            // add key to force re-render
            // see: https://github.com/vant-ui/vant/issues/7963
            key={allowHtml ? 1 : 0}
            class={bem('content', { isolated: !hasTitle })}
          >
            {renderMessage(hasTitle)}
            {longText && <div class={bem('content', { blur: true })}></div>}
          </div>
        );
      }
    };

    const renderButtons = () => (
      <div class={[BORDER_TOP, bem('footer')]}>
        {props.showCancelButton && (
          <Button
            size="large"
            text={props.cancelButtonText || t('cancel')}
            class={bem('cancel')}
            style={{ color: props.cancelButtonColor }}
            loading={loading['cancel']}
            disabled={props.cancelButtonDisabled}
            onClick={onCancel}
          />
        )}
        {props.showConfirmButton && (
          <Button
            size="large"
            text={props.confirmButtonText || t('confirm')}
            class={[bem('confirm'), { [BORDER_LEFT]: props.showCancelButton }]}
            style={{ color: props.confirmButtonColor }}
            loading={loading['confirm']}
            disabled={props.confirmButtonDisabled}
            onClick={onConfirm}
          />
        )}
        {props.showDestructiveButton && (
          <Button
            size="large"
            text={props.destructiveButtonText || t('destructive')}
            class={[
              bem('destructive'),
              { [BORDER_LEFT]: props.showCancelButton },
            ]}
            style={{ color: props.destructiveButtonColor }}
            loading={loading['destructive']}
            disabled={props.destructiveButtonDisabled}
            onClick={onDestructive}
          />
        )}
      </div>
    );

    const renderRoundButtons = () => (
      <ActionBar class={bem('footer')}>
        {props.showCancelButton && (
          <ActionBarButton
            type="warning"
            text={props.cancelButtonText || t('cancel')}
            class={bem('cancel')}
            color={props.cancelButtonColor}
            loading={loading.cancel}
            disabled={props.cancelButtonDisabled}
            onClick={onCancel}
          />
        )}
        {props.showConfirmButton && (
          <ActionBarButton
            type="danger"
            text={props.confirmButtonText || t('confirm')}
            class={bem('confirm')}
            color={props.confirmButtonColor}
            loading={loading.confirm}
            disabled={props.confirmButtonDisabled}
            onClick={onConfirm}
          />
        )}
      </ActionBar>
    );

    // render custom footer
    const renderFooterButtons = () => {
      return props.footerActions!.map((action, index) => (
        <Button
          size="large"
          text={action.text}
          class={[BORDER_TOP, bem(action.type || 'default')]}
          style={{ color: action.color }}
          loading={loading[action.text + index]}
          disabled={action.disabled}
          onClick={() => {
            getActionHandler(
              action.type || 'default',
              action.text + index,
              false,
            )();
            action.action && action.action();
          }}
        />
      ));
    };

    const renderFooter = () => {
      if (slots.footer) {
        return slots.footer();
      }
      if (props.footerActions) {
        return renderFooterButtons();
      }
      return props.theme === 'round-button'
        ? renderRoundButtons()
        : renderButtons();
    };

    return () => {
      const { width, title, theme, message, className } = props;
      return (
        <Popup
          ref={root}
          role="dialog"
          class={[bem([theme]), className]}
          style={{ width: addUnit(width) }}
          tabindex={0}
          aria-labelledby={title || message}
          onKeydown={onKeydown}
          onUpdate:show={updateShow}
          {...pick(props, popupInheritKeys)}
        >
          {renderTitle()}
          {renderContent()}
          {renderFooter()}
        </Popup>
      );
    };
  },
});
