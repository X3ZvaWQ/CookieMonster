import { settingClasses } from '@cookiemonsterteam/cookiemonsterframework/src/index';

import CheckNotificationPermissions from '../Config/CheckNotificationPermissions';
import RefreshScale from '../Disp/HelperFunctions/RefreshScale';
import { SimDoSims } from '../Sim/VariablesAndData'; // eslint-disable-line no-unused-vars
import ToggleBotBar from '../Config/Toggles/ToggleBotBar';
import ToggleDetailedTime from '../Config/Toggles/ToggleDetailedTime';
import ToggleGCTimer from '../Config/Toggles/ToggleGCTimer';
import ToggleSectionHideButtons from '../Config/Toggles/ToggleSectionHideButtons';
import ToggleToolWarnPos from '../Config/Toggles/ToggleToolWarnPos';
import ToggleUpgradeBarAndColour from '../Config/Toggles/ToggleUpgradeBarAndColour';
import ToggleUpgradeBarFixedPos from '../Config/Toggles/ToggleUpgradeBarFixedPos';
import ToggleWrinklerButtons from '../Config/Toggles/ToggleWrinklerButtons';
import UpdateBuildings from '../Disp/BuildingsUpgrades/Buildings';
import { UpdateFavicon } from '../Disp/TabTitle/FavIcon';
import UpdateUpgradeSectionsHeight from '../Disp/BuildingsUpgrades/UpdateUpgradeSectionsHeight';
import UpdateUpgrades from '../Disp/BuildingsUpgrades/Upgrades';
import { ToggleTimerBar, ToggleTimerBarPos } from '../Config/SpecificToggles';

/** This includes all options of CookieMonster and their relevant data */
const settings = {
  // Calculation
  CPSMode: new settingClasses.SettingStandard(
    1,
    'bool',
    'Calculation',
    ['当前每秒收入', '平均每秒收入'],
    '使用【当前每秒收入】还是【平均每秒收入】来计算时间',
    false,
  ),
  AvgCPSHist: new settingClasses.SettingStandard(
    3,
    'bool',
    'Calculation',
    [
      '10s 内平均收入',
      '15s 内平均收入',
      '30s 内平均收入',
      '1m 内平均收入',
      '5m 内平均收入',
      '10m 内平均收入',
      '15m 内平均收入',
      '30m 内平均收入',
    ],
    '每秒平均收入计算窗口',
    false,
  ),
  AvgClicksHist: new settingClasses.SettingStandard(
    0,
    'bool',
    'Calculation',
    [
      '1s 内平均点击数',
      '5s 内平均点击数',
      '10s 内平均点击数',
      '15s 内平均点击数',
      '30s 内平均点击数',
    ],
    '平均点击数计算窗口',
    false,
  ),
  CalcWrink: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'Calculation',
    ['不计算饼干虫', '计算饼干虫的影响', '计算单个最胖的饼干虫'],
    '是否将饼干虫纳入计算',
    true,
    () => {
      SimDoSims = true;
    },
  ),

  // Notation
  Scale: new settingClasses.SettingStandardWithFunc(
    2,
    'bool',
    'Notation',
    ['游戏设置的尺度', '公制', '短尺度', '短尺度（简写）', '科学计数法', '工程记数法'],
    '游戏内数字显示格式',
    false,
    () => {
      RefreshScale();
    },
  ),
  ScaleDecimals: new settingClasses.SettingStandardWithFunc(
    2,
    'bool',
    'Notation',
    ['1 位', '2 位', '3 位'],
    `小数点后显示的数字位数（只会影响CookieMonster的显示，不会影响游戏原生显示）`,
    false,
    () => {
      RefreshScale();
    },
  ),
  ScaleSeparator: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'Notation',
    ['“.”小数点，“,”千位分隔符（标准）', '“.”作为千位分隔符，“,”作为小数点'],
    '小数点以及千位分隔符',
    false,
    () => {
      RefreshScale();
    },
  ),
  ScaleCutoff: new settingClasses.SettingInputNumber(
    999999,
    'numscale',
    'Notation',
    '格式化截断点: ',
    '数字大于多少时进行格式化，默认为999999，如果超过9个9可能导致某些显示异常',
    1,
    999999999,
  ),
  TimeFormat: new settingClasses.SettingStandard(
    0,
    'bool',
    'Notation',
    ['XXd, XXh, XXm, XXs', 'XX:XX:XX:XX:XX', 'XXx, XXx'],
    '时间格式',
    false,
  ),
  DetailedTime: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'Notation',
    ['不显示', '显示'],
    '是否在统计/悬浮提示中显示详细时间',
    true,
    () => {
      ToggleDetailedTime();
    },
  ),
  PPDisplayTime: new settingClasses.SettingStandard(
    0,
    'bool',
    'Notation',
    ['计算值 (默认)', '时间单位'],
    '以计算值或近似的时间单位显示PP。（PP不能直接转化为时间单位，因此这只是一个近似值）',
    false,
  ),

  // Colours
  BuildColour: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'Colours',
    ['不显示建筑价格颜色', '显示建筑价格颜色'],
    '建筑价格显示颜色表示性价比',
    true,
    () => {
      UpdateBuildings();
    },
  ),
  PPOnlyConsiderBuyable: new settingClasses.SettingStandard(
    0,
    'bool',
    'Colours',
    ['不无视无法购买的建筑/升级', '无视无法购买的建筑/升级'],
    '所有无法购买的建筑/升级都将会被显示为红色，不再考虑他们的性价比',
    true,
  ),
  PPExcludeTop: new settingClasses.SettingStandard(
    0,
    'bool',
    'Colours',
    ['不忽略', '忽略 1 个最优建筑/升级', '忽略 2 个最优建筑/升级', '忽略 3 个最优建筑/升级'],
    '标注性价比的时候忽略前几个最优建筑/升级',
    true,
  ),
  PPRigidelMode: new settingClasses.SettingStandard(
    0,
    'bool',
    'Colours',
    ['Rigidel mode OFF', 'Rigidel mode ON'],
    '让饼干怪兽在给PP上色时忽略所有 "买1 "的选项，以保持万神殿激活Rigidel时的总建筑数量为10的倍数',
    true,
  ),
  PPSecondsLowerLimit: new settingClasses.SettingInputNumber(
    0,
    'numscale',
    'Colours',
    '最佳 PP (秒): ',
    '如果一个建筑/升级的成本低于指定的CPS秒数，它也将被认为是最佳的，并标明它是最佳的（"PP低于XX秒的CPS"）；设置为0将忽略这个选项',
    0,
    Infinity,
  ),
  ColourBlue: new settingClasses.SettingColours(
    '#4bb8f0',
    'colour',
    'Colours',
    '颜色代码【蓝色】：用于显示比最佳PP建筑或升级/点击狂热条/各种标签',
  ),
  ColourGreen: new settingClasses.SettingColours(
    '#00ff00',
    'colour',
    'Colours',
    '颜色代码【绿色】：用于显示最佳PP建筑或升级/狂热条/各种标签',
  ),
  ColourYellow: new settingClasses.SettingColours(
    '#ffff00',
    'colour',
    'Colours',
    '颜色代码【黄色】：用于显示PP前10的建筑或升级/狂热条/各种标签',
  ),
  ColourOrange: new settingClasses.SettingColours(
    '#ff7f00',
    'colour',
    'Colours',
    '颜色代码【橙色】：用于显示PP前20的建筑或升级/驯鹿倒计时/各种标签',
  ),
  ColourRed: new settingClasses.SettingColours(
    '#ff0000',
    'colour',
    'Colours',
    '颜色代码【红色】：用于显示PP前30的建筑或升级/凝块条/各种标签',
  ),
  ColourPurple: new settingClasses.SettingColours(
    '#ff00ff',
    'colour',
    'Colours',
    '颜色代码【紫色】：用于显示PP排名30以外的建筑或升级/下一个黄金饼干倒记时/各种标签',
  ),
  ColourGray: new settingClasses.SettingColours(
    '#b3b3b3',
    'colour',
    'Colours',
    '颜色代码【灰色】：用于显示无用/负收益建筑或升级/黄金饼干CD/废墟条/各种标签',
  ),
  ColourPink: new settingClasses.SettingColours(
    '#ff1493',
    'colour',
    'Colours',
    '颜色代码【粉色】：Dragon flight',
  ),
  ColourBrown: new settingClasses.SettingColours(
    '#8b4513',
    'colour',
    'Colours',
    '颜色代码【棕色】：Dragon Harvest bar',
  ),

  // BarsDisplay
  BotBar: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '打开'],
    '底部建筑信息条',
    true,
    () => {
      ToggleBotBar();
    },
  ),
  TimerBar: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '打开'],
    '倒记时条：黄金饼干、季节、狂热',
    true,
    () => {
      ToggleTimerBar();
    },
  ),
  TimerBarPos: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'BarsDisplay',
    ['左上角', '正下方'],
    '倒记时条显示位置',
    false,
    () => {
      ToggleTimerBarPos();
    },
  ),
  TimerBarOverlay: new settingClasses.SettingStandard(
    2,
    'bool',
    'BarsDisplay',
    ['啥也不显示', '仅显示秒数', '显示全部信息'],
    '倒记时条显示剩余时间/百分比',
    true,
  ),
  AutosaveTimerBar: new settingClasses.SettingStandard(
    0,
    'bool',
    'BarsDisplay',
    ['不显示', '显示'],
    '自动保存倒记时条',
    true,
  ),
  UpBarColour: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'BarsDisplay',
    ['不显示', '显示升级颜色及数量统计', '仅显示升级颜色'],
    '升级的颜色/统计',
    false,
    () => {
      ToggleUpgradeBarAndColour();
    },
  ),
  UpgradeBarFixedPos: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '锁定屏幕顶部的升级栏，防止其在滚动时移出屏幕',
    true,
    () => {
      ToggleUpgradeBarFixedPos();
    },
  ),
  SortBuildings: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'BarsDisplay',
    ['默认顺序', '单个建筑PP排序', '选中购买数量建筑PP排序', '解锁下个成就总价排序'],
    '建筑排序',
    false,
    () => {
      UpdateBuildings();
    },
  ),
  SortUpgrades: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'BarsDisplay',
    ['默认排序', '按照PP排序'],
    '升级排序',
    false,
    () => {
      UpdateUpgrades();
    },
  ),
  UpgradesNeverCollapse: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '总是显示所有升级',
    true,
    () => {
      UpdateUpgradeSectionsHeight();
    },
  ),
  DragonAuraInfo: new settingClasses.SettingStandard(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '显示关于龙脉界面中CPS和成本的变化信息。',
    true,
  ),
  GrimoireBar: new settingClasses.SettingStandard(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '魔法条满计时器',
    true,
  ),
  GCTimer: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '金色饼干计时器',
    true,
    () => {
      ToggleGCTimer();
    },
  ),
  Favicon: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '更新图标 金色/愤怒饼干',
    true,
    () => {
      UpdateFavicon();
    },
  ),
  WrinklerButtons: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '左侧曲奇下方显示按钮用于点饼干虫',
    true,
    () => {
      ToggleWrinklerButtons();
    },
  ),
  HideSectionsButtons: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'BarsDisplay',
    ['关闭', '启用'],
    '在右侧显示按钮用于隐藏建筑/升级',
    true,
    () => {
      ToggleSectionHideButtons();
    },
  ),

  // Tooltip
  TooltipBuildUpgrade: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['关闭', '启用'],
    '建筑/升级 悬浮窗的额外信息',
    true,
  ),
  TooltipAmor: new settingClasses.SettingStandard(
    0,
    'bool',
    'Tooltip',
    ['关闭', '启用'],
    '在建筑物工具提示中增加摊销信息',
    true,
  ),
  ToolWarnLucky: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Tooltip lucky warning OFF', 'Tooltip lucky warning ON'],
    'A warning when buying if it will put the bank under the amount needed for max "Lucky!" rewards',
    true,
  ),
  ToolWarnLuckyFrenzy: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Tooltip lucky frenzy warning OFF', 'Tooltip lucky frenzy warning ON'],
    'A warning when buying if it will put the bank under the amount needed for max "Lucky!" (Frenzy) rewards',
    true,
  ),
  ToolWarnConjure: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Tooltip conjure warning OFF', 'Tooltip conjure warning ON'],
    'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards',
    true,
  ),
  ToolWarnConjureFrenzy: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Tooltip conjure frenzy warning OFF', 'Tooltip conjure frenzy warning ON'],
    'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards with Frenzy active',
    true,
  ),
  ToolWarnEdifice: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Tooltip edifice warning OFF', 'Tooltip edifice warning ON'],
    'A warning when buying if it will put the bank under the amount needed for "Spontaneous Edifice" to possibly give you your most expensive building',
    true,
  ),
  ToolWarnUser: new settingClasses.SettingInputNumber(
    0,
    'numscale',
    'Tooltip',
    'Tooltip warning at x times CPS: ',
    'Use this to show a customized warning if buying it will put the bank under the amount equal to value times cps; setting to 0 disables the function altogether',
    0,
    Infinity,
  ),
  ToolWarnBon: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Calculate tooltip warning with bonus CPS OFF', 'Calculate tooltip warning with bonus CPS ON'],
    'Calculate the warning with or without the bonus CPS you get from buying',
    true,
  ),
  ToolWarnPos: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'Tooltip',
    ['Tooltip warning position (left)', 'Tooltip warning position (bottom)'],
    'Placement of the warning boxes',
    false,
    () => {
      ToggleToolWarnPos();
    },
  ),
  TooltipGrim: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Grimoire tooltip information OFF', 'Grimoire tooltip information ON'],
    'Extra information in tooltip for grimoire',
    true,
  ),
  TooltipWrink: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Wrinkler tooltip OFF', 'Wrinkler tooltip ON'],
    'Shows the amount of cookies a wrinkler will give when popping it',
    true,
  ),
  TooltipLump: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Sugar lump tooltip OFF', 'Sugar lump tooltip ON'],
    'Shows the current Sugar Lump type in Sugar lump tooltip.',
    true,
  ),
  TooltipPlots: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Garden plots tooltip OFF', 'Garden plots tooltip ON'],
    'Shows a tooltip for plants that have a cookie reward.',
    true,
  ),
  TooltipPantheon: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Pantheon tooltip OFF', 'Pantheon tooltip ON'],
    'Shows additional info in the pantheon tooltip',
    true,
  ),
  TooltipAscendButton: new settingClasses.SettingStandard(
    1,
    'bool',
    'Tooltip',
    ['Show Extra Info Ascend Tooltip OFF', 'Show Extra Info Ascend Tooltip ON'],
    'Shows additional info in the ascend tooltip',
    true,
  ),

  // Statistics
  Stats: new settingClasses.SettingStandard(
    1,
    'bool',
    'Statistics',
    ['Statistics OFF', 'Statistics ON'],
    'Extra Cookie Monster statistics!',
    true,
  ),
  MissingUpgrades: new settingClasses.SettingStandard(
    1,
    'bool',
    'Statistics',
    ['Missing upgrades OFF', 'Missing upgrades ON'],
    'Shows missing upgrades in statistics menu',
    true,
  ),
  MissingAchievements: new settingClasses.SettingStandard(
    0,
    'bool',
    'Statistics',
    ['Missing Achievements OFF', 'Missing Normal Achievements ON'],
    'Shows missing normal achievements in statistics menu.',
    true,
  ),
  UpStats: new settingClasses.SettingStandard(
    1,
    'bool',
    'Statistics',
    ['Statistics update rate (default)', 'Statistics update rate (1s)'],
    'Default rate is once every 5 seconds',
    false,
  ),
  HeavenlyChipsTarget: new settingClasses.SettingInputNumber(
    1,
    'numscale',
    'Statistics',
    'Heavenly chips target: ',
    'Use this to set a heavenly chips target that will be counted towards in the "prestige" statsistics sections',
    1,
    Infinity,
  ),
  ShowMissedGC: new settingClasses.SettingStandard(
    1,
    'bool',
    'Statistics',
    ['Missed GC OFF', 'Missed GC ON'],
    'Show a stat in the statistics screen that counts how many golden cookies you have missed',
    true,
  ),

  // Notification
  Title: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationGeneral',
    ['Title OFF', 'Title ON', 'Title pinned tab highlight'],
    'Update title with colden cookie/season popup timers; pinned tab highlight only changes the title when a golden cookie/season popup spawns; "!" means that golden cookie/reindeer can spawn',
    true,
  ),
  GeneralSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationGeneral',
    ['Consider game volume setting OFF', 'Consider game volume setting ON'],
    'Turning this toggle to "off" makes Cookie Monster no longer consider the volume setting of the base game, allowing mod notifications to play with base game volume turned down',
    true,
  ),
  GCNotification: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'NotificationGC',
    ['Notification OFF', 'Notification ON'],
    'Create a notification when golden cookie spawns',
    true,
    () => {
      CheckNotificationPermissions(
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCNotification,
      );
    },
  ),
  GCFlash: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationGC',
    ['Flash OFF', 'Flash ON'],
    'Flash screen on golden cookie',
    true,
  ),
  ColourGCFlash: new settingClasses.SettingColours(
    '#ffffff',
    'colour',
    'NotificationGC',
    'The colour of the GC flash, standard colour is white',
  ),
  GCSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationGC',
    ['Sound OFF', 'Sound ON'],
    'Play a sound on golden cookie',
    true,
  ),
  GCVolume: new settingClasses.SettingVolume(100, 'vol', 'NotificationGC', [], 'Volume'),
  GCSoundURL: new settingClasses.SettingStandard(
    'https://freesound.org/data/previews/66/66717_931655-lq.mp3',
    'url',
    'NotificationGC',
    'Sound URL:',
    'URL of the sound to be played when a golden cookie spawns',
  ),
  FortuneNotification: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'NotificationFC',
    ['Notification OFF', 'Notification ON'],
    'Create a notification when fortune cookie is on the ticker',
    true,
    () => {
      CheckNotificationPermissions(
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.FortuneNotification,
      );
    },
  ),
  FortuneFlash: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationFC',
    ['Flash OFF', 'Flash ON'],
    'Flash screen on fortune cookie spawn',
    true,
  ),
  ColourFortuneFlash: new settingClasses.SettingColours(
    '#ffffff',
    'colour',
    'NotificationFC',
    'The colour of the fortune flash, standard colour is white',
  ),
  FortuneSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationFC',
    ['Sound OFF', 'Sound ON'],
    'Play a sound on fortune cookie spawn',
    true,
  ),
  FortuneVolume: new settingClasses.SettingVolume(100, 'vol', 'NotificationFC', [], 'Volume'),
  FortuneSoundURL: new settingClasses.SettingStandard(
    'https://freesound.org/data/previews/174/174027_3242494-lq.mp3',
    'url',
    'NotificationFC',
    'Sound URL:',
    'URL of the sound to be played when the ticker has a fortune cookie',
  ),
  SeaNotification: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'NotificationSea',
    ['Notification OFF', 'Notification ON'],
    'Create a notification on season popup',
    true,
    () => {
      CheckNotificationPermissions(
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SeaNotification,
      );
    },
  ),
  SeaFlash: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationSea',
    ['Flash OFF', 'Flash ON'],
    'Flash screen on season popup',
    true,
  ),
  ColourSeaFlash: new settingClasses.SettingColours(
    '#ffffff',
    'colour',
    'NotificationSea',
    'The colour of the season popup flash, standard colour is white',
  ),
  SeaSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationSea',
    ['Sound OFF', 'Sound ON'],
    'Play a sound on season popup',
    true,
  ),
  SeaVolume: new settingClasses.SettingVolume(100, 'vol', 'NotificationSea', [], 'Volume'),
  SeaSoundURL: new settingClasses.SettingStandard(
    'https://www.freesound.org/data/previews/121/121099_2193266-lq.mp3',
    'url',
    'NotificationSea',
    'Sound URL:',
    'URL of the sound to be played when on season popup spawns',
  ),
  GardFlash: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationGard',
    ['Garden Tick Flash OFF', 'Flash ON'],
    'Flash screen on garden tick',
    true,
  ),
  ColourGardFlash: new settingClasses.SettingColours(
    '#ffffff',
    'colour',
    'NotificationGard',
    'The colour of the garden flash, standard colour is white',
  ),
  GardSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationGard',
    ['Sound OFF', 'Sound ON'],
    'Play a sound on garden tick',
    true,
  ),
  GardVolume: new settingClasses.SettingVolume(100, 'vol', 'NotificationGard', [], 'Volume'),
  GardSoundURL: new settingClasses.SettingStandard(
    'https://freesound.org/data/previews/103/103046_861714-lq.mp3',
    'url',
    'NotificationGard',
    'Garden Tick Sound URL:',
    'URL of the sound to be played when the garden ticks',
  ),
  MagicNotification: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'NotificationMagi',
    ['Notification OFF', 'Notification ON'],
    'Create a notification when magic reaches maximum',
    true,
    () => {
      CheckNotificationPermissions(
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MagicNotification,
      );
    },
  ),
  MagicFlash: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationMagi',
    ['Flash OFF', 'Flash ON'],
    'Flash screen when magic reaches maximum',
    true,
  ),
  ColourMagicFlash: new settingClasses.SettingColours(
    '#ffffff',
    'colour',
    'NotificationMagi',
    'The colour of the magic flash, standard colour is white',
  ),
  MagicSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationMagi',
    ['Sound OFF', 'Sound ON'],
    'Play a sound when magic reaches maximum',
    true,
  ),
  MagicVolume: new settingClasses.SettingVolume(100, 'vol', 'NotificationMagi', [], 'Volume'),
  MagicSoundURL: new settingClasses.SettingStandard(
    'https://freesound.org/data/previews/221/221683_1015240-lq.mp3',
    'url',
    'NotificationMagi',
    'Sound URL:',
    'URL of the sound to be played when magic reaches maxium',
  ),
  WrinklerNotification: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'NotificationWrink',
    ['Notification OFF', 'Notification ON'],
    'Create a notification when a wrinkler appears',
    true,
    () => {
      CheckNotificationPermissions(
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerNotification,
      );
    },
  ),
  WrinklerFlash: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationWrink',
    ['Flash OFF', 'Flash ON'],
    'Flash screen when a wrinkler appears',
    true,
  ),
  ColourWrinklerFlash: new settingClasses.SettingColours(
    '#ffffff',
    'colour',
    'NotificationWrink',
    'The colour of the wrinkler flash, standard colour is white',
  ),
  WrinklerSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationWrink',
    ['Sound OFF', 'Sound ON'],
    'Play a sound when a wrinkler appears',
    true,
  ),
  WrinklerVolume: new settingClasses.SettingVolume(100, 'vol', 'NotificationWrink', [], 'Volume'),
  WrinklerSoundURL: new settingClasses.SettingStandard(
    'https://freesound.org/data/previews/124/124186_8043-lq.mp3',
    'url',
    'NotificationWrink',
    'Sound URL:',
    'URL of the sound to be played when a wrinkler appears',
  ),
  WrinklerMaxNotification: new settingClasses.SettingStandardWithFunc(
    0,
    'bool',
    'NotificationWrinkMax',
    ['Notification OFF', 'Notification ON'],
    'Create a notification when the maximum amount of wrinklers has appeared',
    true,
    () => {
      CheckNotificationPermissions(
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerMaxNotification,
      );
    },
  ),
  WrinklerMaxFlash: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationWrinkMax',
    ['Flash OFF', 'Flash ON'],
    'Flash screen when the maximum amount of Wrinklers has appeared',
    true,
  ),
  ColourWrinklerMaxFlash: new settingClasses.SettingColours(
    '#ffffff',
    'colour',
    'NotificationWrinkMax',
    'The colour of the maximum wrinkler flash, standard colour is white',
  ),
  WrinklerMaxSound: new settingClasses.SettingStandard(
    1,
    'bool',
    'NotificationWrinkMax',
    ['Sound OFF', 'Sound ON'],
    'Play a sound when the maximum amount of wrinklers has appeared',
    true,
  ),
  WrinklerMaxVolume: new settingClasses.SettingVolume(
    100,
    'vol',
    'NotificationWrinkMax',
    [],
    'Volume',
  ),
  WrinklerMaxSoundURL: new settingClasses.SettingStandard(
    'https://freesound.org/data/previews/152/152743_15663-lq.mp3',
    'url',
    'NotificationWrinkMax',
    'Sound URL:',
    'URL of the sound to be played when the maximum amount of wrinklers has appeared',
  ),

  // Miscellaneous
  BulkBuyBlock: new settingClasses.SettingStandard(
    1,
    'bool',
    'Miscellaneous',
    ['Block bulk buying OFF', 'Block bulk buying ON'],
    "Block clicking bulk buying when you can't buy all. This prevents buying 7 of a building when you are in buy-10 or buy-100 mode.",
    true,
  ),
  FavouriteSettings: new settingClasses.SettingStandardWithFunc(
    1,
    'bool',
    'Miscellaneous',
    [
      'Favourite settings section OFF',
      'Favourite settings section ON',
      'Favourite settings section ON (Locked)',
    ],
    "Show stars before each setting which allows selecting it for a 'favourites' section at the top of the Cookie Monster settings. Setting this to Locked removes the stars but shows the 'favourites' section",
    true,
    () => {
      Game.UpdateMenu();
    },
  ),
};

export default settings;
