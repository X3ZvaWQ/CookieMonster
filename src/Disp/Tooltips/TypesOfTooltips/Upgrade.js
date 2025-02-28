import { CacheLastChoEgg, CacheUpgrades } from '../../../Cache/VariablesAndData';

import Beautify from '../../BeautifyAndFormatting/Beautify';
import FormatTime from '../../BeautifyAndFormatting/FormatTime';
import GetTimeColour from '../../BeautifyAndFormatting/GetTimeColour';
import GetCPS from '../../HelperFunctions/GetCPS';
import GetWrinkConfigBank from '../../HelperFunctions/GetWrinkConfigBank';
import {
  ColourTextPre,
  TooltipBonusIncome,
  TooltipBonusMouse,
  TooltipName,
  TooltipPrice,
} from '../../VariablesAndData';
import * as Create from '../CreateTooltip';

/**
 * This function adds extra info to the Upgrade tooltips
 */
export default function Upgrade() {
  const tooltipBox = l('CMTooltipBorder');
  Create.TooltipCreateCalculationSection(tooltipBox);

  TooltipBonusIncome = CacheUpgrades[Game.UpgradesInStore[TooltipName].name].bonus;
  TooltipPrice = Game.Upgrades[Game.UpgradesInStore[TooltipName].name].getPrice();
  TooltipBonusMouse = CacheUpgrades[Game.UpgradesInStore[TooltipName].name].bonusMouse;

  if (
    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipBuildUpgrade === 1
  ) {
    l('CMTooltipIncome').textContent = Beautify(TooltipBonusIncome, 2);
    const increase = Math.round((TooltipBonusIncome / Game.cookiesPs) * 10000);
    // Don't display certain parts of tooltip if not applicable
    if (l('CMTooltipIncome').textContent === '0') {
      l('Bonus IncomeTitle').style.display = 'none';
      l('CMTooltipIncome').style.display = 'none';
      l('Payback PeriodTitle').style.display = 'none';
      l('CMTooltipPP').style.display = 'none';
    } else {
      if (Number.isFinite(increase) && increase !== 0) {
        l('CMTooltipIncome').textContent += ` (${increase / 100}% of income)`;
      } else {
        l('CMTooltipIncome').textContent += ` (<0${
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator
            ? ','
            : '.'
        }01% of income)`;
      }
      l('CMTooltipBorder').className =
        ColourTextPre + CacheUpgrades[Game.UpgradesInStore[TooltipName].name].colour;
    }

    // If clicking power upgrade
    if (TooltipBonusMouse) {
      l('CMTooltipCookiePerClick').textContent = Beautify(TooltipBonusMouse);
      l('CMTooltipCookiePerClick').style.display = 'block';
      l('CMTooltipCookiePerClick').previousSibling.style.display = 'block';
    }
    // If only a clicking power upgrade change PP to click-based period
    if (!TooltipBonusIncome && TooltipBonusMouse) {
      l('CMTooltipPP').textContent = `${Beautify(TooltipPrice / TooltipBonusMouse)} Clicks`;
      l('CMTooltipPP').style.color = 'white';
      l('Payback PeriodTitle').style.display = 'block';
      l('CMTooltipPP').style.display = 'block';
    } else {
      if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPDisplayTime)
        l('CMTooltipPP').textContent = FormatTime(
          CacheUpgrades[Game.UpgradesInStore[TooltipName].name].pp,
        );
      else
        l('CMTooltipPP').textContent = Beautify(
          CacheUpgrades[Game.UpgradesInStore[TooltipName].name].pp,
          2,
        );
      l('CMTooltipPP').className =
        ColourTextPre + CacheUpgrades[Game.UpgradesInStore[TooltipName].name].colour;
    }
    const timeColour = GetTimeColour(
      (TooltipPrice - (Game.cookies + GetWrinkConfigBank())) / GetCPS(),
    );
    l('CMTooltipTime').textContent = timeColour.text;
    if (
      timeColour.text === '已达到!' &&
      Game.cookies < Game.UpgradesInStore[TooltipName].getPrice()
    ) {
      l('CMTooltipTime').textContent = `${timeColour.text} (with Wrink)`;
    } else l('CMTooltipTime').textContent = timeColour.text;
    l('CMTooltipTime').className = ColourTextPre + timeColour.colour;

    // Add extra info to Chocolate egg tooltip
    if (Game.UpgradesInStore[TooltipName].name === 'Chocolate egg') {
      l('CMTooltipBorder').lastChild.style.marginBottom = '4px';
      l('CMTooltipBorder').appendChild(
        Create.TooltipCreateHeader('Cookies to be gained (Currently/Max)'),
      );
      const chocolate = document.createElement('div');
      chocolate.style.color = 'white';
      chocolate.textContent = `${Beautify(Game.cookies * 0.05)} / ${Beautify(CacheLastChoEgg)}`;
      l('CMTooltipBorder').appendChild(chocolate);
    }
  } else l('CMTooltipArea').style.display = 'none';
}
