import { HERO_XP_THRESHOLDS, STANDARD_XP_THRESHOLDS } from './config.js';
import { formatXPDisplay } from './slow-witted.js';

/** Renders the Hero XP Advancement Visual Bar (MAX 90 XP) */
export const renderHeroXPBar = (currentXP) => {
    const container = document.getElementById('hero-xp-bar-container');
    const title = document.getElementById('xp-bar-title');
    const xp = parseFloat(currentXP) || 0;
    const maxXP = 90;
    const thresholds = HERO_XP_THRESHOLDS;
    title.textContent = `Registro de Avance de Héroes (0 a 90 PX)`;
    
    const fillPercentage = Math.min(100, (xp / maxXP) * 100);

    let barHTML = `<div id="xp-bar-track" class="mt-4">
                        <div id="xp-bar-fill" style="width: ${fillPercentage}%"></div>`;
    
    let nextLevelXP = maxXP;
    
    // Add Markers
    thresholds.forEach(threshold => {
        const position = (threshold / maxXP) * 100;
        let isLevelUp = xp >= threshold;
        let isCurrentLevel = false;

        // Find the next threshold (the lowest threshold greater than current XP)
        if (xp < threshold && threshold < nextLevelXP) {
            nextLevelXP = threshold;
        }
        
        // Highlight the next level threshold if not already attained
        if (threshold === nextLevelXP || (xp >= maxXP && threshold === maxXP) || (xp < thresholds[0] && threshold === thresholds[0])) {
            isCurrentLevel = true;
        }


        barHTML += `<div class="xp-marker ${isLevelUp ? 'achieved' : ''} ${isCurrentLevel ? 'current' : ''}" style="left: ${position}%">
            <span class="xp-marker-label">${threshold}</span>
        </div>`;
    });
    
    barHTML += `</div>`;
    
    // Add label below the bar - use formatXPDisplay for fractional values
    barHTML += `<p class="text-xs mt-10 text-slate-400">PX actuales: <span class="font-bold text-lg text-yellow-200">${formatXPDisplay(xp)}</span> / PX máx.: ${maxXP}</p>`;

    container.innerHTML = barHTML;
};

/** Renders the appropriate XP Bar based on special rules (Slow Witted uses fractional XP display) */
export const renderXPBar = (currentXP, specialRules) => {
    // For Slow Witted fighters, we use the standard XP bar but with fractional XP values
    // The logic for advancement thresholds is handled in the advancement functions
    renderStandardXPBar(currentXP);
};

/** Renders the Standard Advancement Visual Bar (MAX 14 XP) */
export const renderStandardXPBar = (currentXP) => {
    const container = document.getElementById('hero-xp-bar-container');
    const title = document.getElementById('xp-bar-title');
    const xp = parseFloat(currentXP) || 0;
    const maxXP = 14;
    const thresholds = STANDARD_XP_THRESHOLDS;
    title.textContent = `Registro de Avance Estándar (0 a 14 PX)`;

    const fillPercentage = Math.min(100, (xp / maxXP) * 100);

    let barHTML = `<div id="xp-bar-track" class="mt-4">
                        <div id="xp-bar-fill" style="width: ${fillPercentage}%"></div>`;

    let nextLevelXP = maxXP;

    // Add Markers
    thresholds.forEach(threshold => {
        const position = (threshold / maxXP) * 100;
        let isLevelUp = xp >= threshold;
        let isCurrentLevel = false;

        // Find the next threshold (the lowest threshold greater than current XP)
        if (xp < threshold && threshold < nextLevelXP) {
            nextLevelXP = threshold;
        }

        // Highlight the next level threshold if not already attained
        if (threshold === nextLevelXP || (xp >= maxXP && threshold === maxXP) || (xp < thresholds[0] && threshold === thresholds[0])) {
            isCurrentLevel = true;
        }


        barHTML += `<div class="xp-marker ${isLevelUp ? 'achieved' : ''} ${isCurrentLevel ? 'current' : ''}" style="left: ${position}%">
            <span class="xp-marker-label">${threshold}</span>
        </div>`;
    });

    barHTML += `</div>`;

    // Add label below the bar - use formatXPDisplay for fractional values
    barHTML += `<p class="text-xs mt-10 text-slate-400">PX actuales: <span class="font-bold text-lg text-yellow-200">${formatXPDisplay(xp)}</span> / PX máx.: ${maxXP}</p>`;

    container.innerHTML = barHTML;
};

/** Renders the XP bar for the current fighter based on their type */
export const renderFighterXPBar = (fighter = null) => {
    // If fighter object is provided, use it directly; otherwise read from DOM (for add modal)
    const currentXP = fighter ? fighter.xp : document.getElementById('f-xp').value;
    const fighterType = fighter ? fighter.type : document.getElementById('f-type').value;
    const specialRules = fighter ? (fighter.special_rules || '') : document.getElementById('f-special-rules').value;

    if (fighterType === 'Hero') {
        renderHeroXPBar(currentXP);
    } else {
        renderXPBar(currentXP, specialRules);
    }
};
