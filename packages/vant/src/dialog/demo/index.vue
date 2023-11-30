<script setup lang="tsx">
import VanCell from '../../cell';
import {
  showDialog,
  showConfirmDialog,
  showDestructiveDialog,
  Dialog as VanDialog,
} from '..';
import { ref } from 'vue';
import { cdnURL, useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    title: '标题',
    alert1: '提示弹窗',
    alert2: '提示弹窗（长文本）',
    alert3: '提示弹窗（无标题）',
    alert4: '提示弹窗（无标题、长文本）',
    alert5: '内容高亮',
    alert6: '带图片',
    confirm: '确认弹窗',
    destructiveDialog: '警示弹窗',
    destructive: '警示操作',
    multiple: '多按钮',
    content1: '人们在阅读代码时说脏话的频率是衡量代码质量的唯一标准。',
    content2:
      '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
    content3:
      '生活是一位睿智的长者，生活是一位博学的老师，它常常春风化雨，润物无声地为我们指点迷津，给我们人生的启迪。你说帘外海棠，锦屏鸳鸯；后来庭院春深，咫尺画堂。 你说笛声如诉，费尽思量；后来茶烟尚绿，人影茫茫。 你说可人如玉，与子偕臧；后来长亭远望，夜色微凉。 你说霞染天光，陌上花开与谁享；后来烟笼柳暗，湖心水动影无双。 你说彼岸灯火，心之所向；后来渔舟晚唱，烟雨彷徨。 你 说水静莲香，惠风和畅；后来云遮薄月，清露如霜。 你说幽窗棋罢，再吐衷肠；后来风卷孤松，雾漫山冈。 你说红袖佯嗔，秋波流转思张敞；后来黛眉长敛，春色飘零别阮郎。 你说暗香浮动，刹那光芒；后来玉殒琼碎，疏影横窗。 你说良辰美景，乘兴独往；后来红尘紫陌，雪落太行。 你说赋尽高唐，三生石上；后来君居淄右，妾家河阳。 你说玉楼朱颜，飞月流觞迎客棹；后来幽谷居士，枕琴听雨卧禅房。',
    beforeClose: '异步关闭',
    custom: '自定义',
    roundButton: '圆角按钮样式',
    useComponent: '使用 Dialog 组件',
    main: '主要操作',
    auxiliary1: '辅助操作1',
    auxiliary2: '辅助操作2',
    auxiliary3: '辅助操作3',
  },
  'en-US': {
    title: 'Title',
    alert1: 'Alert',
    alert2: 'Alert with long text',
    alert3: 'Alert without title',
    alert4: 'Alert with long text and without title',
    alert5: 'Alert with highlight content',
    alert6: 'Alert with image',
    confirm: 'Confirm dialog',
    destructiveDialog: 'Destructive dialog',
    destructive: 'Destructive',
    multiple: 'Alert with multiple buttons',
    content1:
      'The frequency of people swearing during code reading is the only measure of code quality.',
    content2:
      'If the solution is ugly, then there must be a better solution, but it has not been discovered yet.',
    content3:
      'Life is a wise elder, and life is a knowledgeable teacher. It often turns into spring breeze and rain, moistens things and silently guides us through the maze and gives us enlightenment in life. You said that there are begonias outside the curtain and mandarin ducks on the brocade screen; later, the spring is deep in the courtyard, and the painting hall is close by. You said that the sound of the flute was like complaining, and it took a lot of thinking; later, the tea smoke was still green, and there were countless people. You said that she was as lovely as jade, and you and I were together. Later, we looked out from a long pavilion, and saw that the night was slightly cool. You said that the rosy clouds dyed the sky, and the flowers on the road bloomed for who to enjoy; later, the smoke and willows were dark, and the water in the middle of the lake moved like no other. You said that the lights on the other side are where your heart is; later, the fishing boats sang at night, and the mist and rain were wandering. You said that the water was still and the lotus scented, and the wind was gentle and smooth; then the clouds covered the thin moon, and the dew was as clear as frost. You talk about chess in the dark window, and then talk about your heart; later, the wind blows through the lonely pine, and the fog covers the mountains. You say that the red sleeves are feigning anger, and the autumn waves are flowing and thinking of Zhang Chang; later, the dark eyebrows are long and narrow, and the spring scenery is drifting away from Ruan Lang. You said that the dark fragrance floats, and the light shines for a moment; later, the jade dies and the jade is broken, and the shadows are sparse across the window. You said that in a good time, you can take advantage of the beautiful scenery and go alone; later, the red dust is purple and the snow is falling. You said that all the gifts were given to Gaotang, and Sansheng was on the stone. Later, the king lived in Ziyou, and his concubine lived in Heyang. You said that the beauty in the jade tower was flying over the moon and flowing over the wine glass to welcome guests; later, the layman in the valley lay in his Zen room with his pillow on his piano and listened to the rain.',
    beforeClose: 'Before Close',
    custom: 'Custom Dialog',
    roundButton: 'Round Button Style',
    useComponent: 'Use Dialog Component',
    main: 'Main Handler',
    auxiliary1: 'Auxiliary Handler 1',
    auxiliary2: 'Auxiliary Handler 2',
    auxiliary3: 'Auxiliary Handler 3',
  },
});

const show = ref(false);
const show1 = ref(false);
const image = cdnURL('apple-3.jpeg');

const onClickAlert = () => {
  showDialog({
    title: t('title'),
    message: t('content1'),
  });
};

const onClickAlert2 = () => {
  showDialog({
    title: t('title'),
    message: t('content3'),
    longText: true,
  });
};

const onClickAlert3 = () => {
  showDialog({
    message: t('content2'),
  });
};

const onClickAlert4 = () => {
  showDialog({
    message: t('content3'),
    longText: true,
  });
};

const onClickRound = () => {
  showDialog({
    theme: 'round-button',
    title: t('title'),
    message: t('content1'),
  });
};

const onClickRound2 = () => {
  showDialog({
    theme: 'round-button',
    message: t('content3'),
    longText: true,
  });
};

const onClickConfirm = () => {
  showConfirmDialog({
    title: t('title'),
    message: t('content1'),
  });
};

const onClickDestructive = () => {
  showDestructiveDialog({
    title: t('title'),
    message: t('content1'),
    destructiveButtonText: t('destructive'),
  });
};

const onClickHighlight = () => {
  showConfirmDialog({
    title: t('title'),
    message: () => (
      <span>
        根据业务判断结果及反馈信息说明，在
        <span style="color: red">特殊字段</span>处高亮
      </span>
    ),
  });
};

const onClickImage = () => {
  showConfirmDialog({
    title: t('title'),
    message: () => (
      <div>
        <span>辅助说明文本尽量不超过2行，也可以没有辅助说明。</span>
        <img
          src={image}
          style="box-sizing: border-box;width: 100%;padding: 25px 20px 0;"
        />
      </div>
    ),
    longText: true,
  });
};

const onClickMultiple = () => {
  const beforeClose = () =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  showDialog({
    title: t('title'),
    message: t('content1'),
    beforeClose,
    footerActions: [
      {
        text: t('main'),
        type: 'destructive',
      },
      {
        text: t('auxiliary1'),
        type: 'confirm',
      },
      {
        text: t('auxiliary2'),
      },
      {
        text: t('auxiliary3'),
        type: 'cancel',
        disabled: true,
      },
    ],
  });
};

const onClickBeforeClose = () => {
  const beforeClose = (action) =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(action === 'confirm'), 1000);
    });

  showConfirmDialog({
    title: t('title'),
    message: t('content1'),
    beforeClose,
  });
};
</script>

<template>
  <demo-block card :title="t('basicUsage')">
    <van-cell is-link :title="t('alert1')" @click="onClickAlert" />
    <van-cell is-link :title="t('alert2')" @click="onClickAlert2" />
    <van-cell is-link :title="t('alert3')" @click="onClickAlert3" />
    <van-cell is-link :title="t('alert4')" @click="onClickAlert4" />
    <van-cell is-link :title="t('confirm')" @click="onClickConfirm" />
    <van-cell
      is-link
      :title="t('destructiveDialog')"
      @click="onClickDestructive"
    />
  </demo-block>

  <demo-block card :title="t('custom')">
    <van-cell is-link :title="t('alert5')" @click="onClickHighlight" />
    <van-cell is-link :title="t('alert6')" @click="onClickImage" />
    <van-cell is-link :title="t('multiple')" @click="onClickMultiple" />
  </demo-block>

  <demo-block card :title="t('roundButton')">
    <van-cell is-link :title="t('alert1')" @click="onClickRound" />
    <van-cell is-link :title="t('alert2')" @click="onClickRound2" />
  </demo-block>

  <demo-block card :title="t('beforeClose')">
    <van-cell is-link :title="t('beforeClose')" @click="onClickBeforeClose" />
  </demo-block>

  <demo-block card :title="t('useComponent')">
    <van-cell is-link :title="t('useComponent')" @click="show = true" />
    <van-cell is-link :title="t('useComponent')" @click="show1 = true" />
    <van-dialog
      v-model:show="show"
      :title="t('title')"
      show-cancel-button
      :lazy-render="false"
    >
      <img :src="image" />
    </van-dialog>
    <van-dialog
      v-model:show="show1"
      :title="t('title')"
      show-cancel-button
      :lazy-render="false"
      :footer-actions="[
        {
          text: t('main'),
          type: 'destructive',
        },
        {
          text: t('auxiliary1'),
          type: 'confirm',
        },
        {
          text: t('auxiliary2'),
        },
        {
          text: t('auxiliary3'),
          type: 'cancel',
        },
      ]"
    >
      <img :src="image" />
    </van-dialog>
  </demo-block>
</template>

<style lang="less">
.demo-dialog {
  img {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
}
</style>
