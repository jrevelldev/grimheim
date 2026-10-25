import { showListView, populateWarbandTypes, showOstermarkSkillSetModal, showTurnOrderTrackerView, renderTurnOrderTracker, renderWarbandEditor, showAuthModal, hideAuthModal, switchToLoginTab, switchToRegisterTab, showAuthError, showEquipmentDetailsModal, showResetPasswordForm, showLoginForm, showBattleView, trackKill, nextPhase, prevPhase, setCurrentPhase, showBattleSkillDetails, showBattleSpellDetails, showBattleEquipmentDetails, showBattleAbilityDetails, toggleAbilityDetails, resetBattleCasualties, applyCasualty, undoCasualty, handleTrapperSkillSelection, handlePackmasterBeastHandlingSelection, handleHiredSwordEquipmentSelection, showExplorationModal, showTreasureExplorationModal, handleTreasureCalculation, applyTreasureToWarband, toggleDiceInputMode, updateCalculatedTotal, useRabbitsFoot, generateAdvancedDiceInputs, toggleAdvancedLocked, maximizeTotalDice, selectDiceForResult } from './ui.js';
import { showEndBattleModal, setBattleResult, processBattleEnd, renderExperienceSection, updateUnderdogRatingDisplay, updateCasualtyResolution } from './End Battle/end_battle.js';
import { showEndBattleHub } from './End Battle/end-battle-hub.js';
import { showAdvancementHub } from './Advancement/advancement-hub.js';
import { openSellTreasureModal, closeSellTreasureModal, showSellConfirmation, cancelSellConfirmation, confirmSellConfirmation } from './Treasury/sell-treasure-modal.js';
import { showReplenishHenchmenModal, setReplenishmentChanges, closeReplenishModal } from './End Battle/replenish-henchmen-modal.js';
import { showAddToStorageModal, showSellFromStorageModal, showEquipmentSelectionModal, renderModalEquipmentOptions, addEquipment, renderEquipmentOptions } from './equipment-management.js';
import { loginWithEmailPassword, registerWithEmailPassword, loginWithGoogle, logout, resetPassword } from './firebase.js';
import { showNewFighterModal } from './fighter-management.js';
import { handleHouseRuleChange, hideModal, showEditorView, showNewWarbandModal, showRenameWarbandModal, displayModal, getWarbandData, showConfirmationModal, handleFullyPaintedChange, showMessage, closeAllDropdowns } from './utility.js'; // Added displayModal for consistency, getWarbandData, showMessage
import { saveWarband, loadWarband, confirmDeleteWarbandFromList, updateTreasury, updateTreasure, removeTreasure, createNewWarband, listenToWarbands, moveFighterUp, moveFighterDown, copyWarband, renameWarband, unsubscribeFromWarbands, exportWarbandJSON, exportAllWarbandsJSON, importWarbandJSON } from './warband-service.js';
import { initFighterManagement, editFighter, takeFromStorage, showNewFighterModal as fighterManagementShowNewFighterModal } from './fighter-management.js';
import { removeSkill, showCostBreakdownModal } from './edit-fighter-modal.js';
import { openBlogModal } from './blog.js'; // Import blog function
import { trackPageAccess, trackSpecialRulesAccess, trackEvent } from './analytics.js'; // Import analytics tracking
import { setCurrentWarband, currentWarband, getWarbands, getIsOrderingMode, setIsOrderingMode, setIsBlackpowderPreGameDiscountActive, setIsBlackpowder20PercentDiscountActive, setIsArmourShieldHalfCostActive } from './state.js'; // Import getWarbands and ordering mode functions
import { initializeAppAndData } from './app-initializer.js';
import { STATS_FIELDS } from './config.js'; // Import STATS_FIELDS
import { SKILLS, SPECIAL_RULES_DETAILS, MAGIC, MASTER_EQUIPMENT_LIST } from './data/index.js'; // Import SKILLS, SPECIAL_RULES_DETAILS, MAGIC, and MASTER_EQUIPMENT_LIST for turn order tracker
import { findSkillForWarband } from './skill-lookup.js';
import { recordUpkeepCosts } from './Treasury/ledger.js'; // Import ledger functions
import { showFeedbackModal, hideFeedbackModal, handleFeedbackSubmit } from './feedback.js'; // Import feedback functions
import { showLedgerModal } from './ledger-ui.js'; // Import ledger modal function
import { setupPreGameEventListeners } from './PreGame/pre-game.js'; // Import Pre-Game Build Phase event listeners
import { showEquipmentReorderModal } from './equipment-reorder-modal.js'; // Equipment reorder modal
import { openGearModal } from './fighter-gear-modal.js'; // Fighter Gear quick-manage modal

export const setupEventListeners = () => {
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('DOMContentLoaded event fired. Setting up event listeners...');
        // Initialize Firebase on load
        populateWarbandTypes(); // Ensure warband types are populated early
        await initializeAppAndData();
        // After initialization, listen to warbands and explicitly show the list view
        listenToWarbands();
        showListView(getWarbands());
        
        // Hamburger Menu Functionality
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileCharacterReviewBtn = document.getElementById('mobile-character-review-btn');
        const mobileCharacterSubmenu = document.getElementById('mobile-character-submenu');
        
        // Toggle mobile menu
        mobileMenuBtn?.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.classList.add('active');
                document.body.classList.add('mobile-menu-open');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        });
        
        // Mobile Data dropdown
        const mobileDataBtn = document.getElementById('mobile-data-btn');
        const mobileDataSubmenu = document.getElementById('mobile-data-submenu');
        
        if (mobileDataBtn && mobileDataSubmenu) {
            mobileDataBtn.addEventListener('click', () => {
                mobileDataSubmenu.classList.toggle('hidden');
            });
        }
        
        // Mobile Character submenu toggle
        if (mobileCharacterReviewBtn && mobileCharacterSubmenu) {
            mobileCharacterReviewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileCharacterSubmenu.classList.toggle('hidden');
                
                // Toggle chevron direction
                const chevron = mobileCharacterReviewBtn.querySelector('i');
                if (chevron) {
                    chevron.classList.toggle('fa-chevron-down');
                    chevron.classList.toggle('fa-chevron-right');
                }
            });
        }
        
        // Mobile Blog dropdown
        const mobileBlogBtn = document.getElementById('mobile-blog-btn');
        const mobileBlogSubmenu = document.getElementById('mobile-blog-submenu');
        
        if (mobileBlogBtn && mobileBlogSubmenu) {
            mobileBlogBtn.addEventListener('click', () => {
                mobileBlogSubmenu.classList.toggle('hidden');
            });
        }
        
        // Mobile menu button handlers - mirror desktop functionality
        // Note: #mobile-card-builder-btn and #card-builder-btn are handled in Cards/card-builder.js

        document.getElementById('mobile-hired-sword-btn')?.addEventListener('click', () => {
            document.getElementById('hired-sword-review-btn')?.click();
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        document.getElementById('mobile-dramatis-personae-btn')?.addEventListener('click', () => {
            document.getElementById('dramatis-personae-review-btn')?.click();
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        document.getElementById('mobile-blog-link')?.addEventListener('click', () => {
            document.getElementById('blog-link')?.click();
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        document.getElementById('mobile-changelog-link')?.addEventListener('click', () => {
            document.getElementById('changelog-link')?.click();
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        document.getElementById('mobile-special-rules-btn')?.addEventListener('click', () => {
            trackSpecialRulesAccess('mobile');
            import('./special-rules-modal.js').then(module => {
                module.showSpecialRulesView();
            });
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        document.getElementById('mobile-rules-btn')?.addEventListener('click', () => {
            trackPageAccess('rules');
            import('./rules-modal.js').then(module => {
                module.showRulesView();
            });
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        document.getElementById('mobile-special-thanks-btn')?.addEventListener('click', () => {
            document.getElementById('special-thanks-btn')?.click();
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        // Mobile feedback dropdown is now handled in feedback-status-modal.js
        
        document.getElementById('mobile-login-btn')?.addEventListener('click', () => {
            document.getElementById('login-btn')?.click();
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        document.getElementById('mobile-logout-btn')?.addEventListener('click', () => {
            document.getElementById('logout-btn')?.click();
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
        
        // Close mobile menu when clicking outside
        mobileMenu?.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        });

        // Close warband dropdown menus when clicking outside
        document.addEventListener('click', (e) => {
            const isMenuButton = e.target.closest('[data-action="toggle-warband-menu"]');
            const isDropdownMenu = e.target.closest('.warband-dropdown-menu');
            
            if (!isMenuButton && !isDropdownMenu) {
                document.querySelectorAll('.warband-dropdown-menu').forEach(menu => {
                    menu.classList.add('hidden');
                });
            }
        });

        // Mobile Warband Editor Tab Switching
        const mobileMembersTab = document.getElementById('mobile-members-tab');
        const mobileManagementTab = document.getElementById('mobile-management-tab');
        const mobileMembersContent = document.getElementById('mobile-members-content');
        const mobileManagementContent = document.getElementById('mobile-management-content');

        // Function to check if we're on mobile
        const isMobile = () => window.innerWidth <= 1023;

        // Function to switch to members tab
        const switchToMembersTab = () => {
            if (mobileMembersTab && mobileManagementTab && mobileMembersContent && mobileManagementContent && isMobile()) {
                // Update tab styling
                mobileMembersTab.classList.add('mobile-tab-active');
                mobileMembersTab.classList.remove('bg-slate-700', 'text-white');
                mobileMembersTab.classList.add('bg-mordheim-gold', 'text-slate-900');
                
                mobileManagementTab.classList.remove('mobile-tab-active');
                mobileManagementTab.classList.remove('bg-mordheim-gold', 'text-slate-900');
                mobileManagementTab.classList.add('bg-slate-700', 'text-white');
                
                // Show/hide content with !important to override CSS (only on mobile)
                mobileMembersContent.style.setProperty('display', 'block', 'important');
                mobileManagementContent.style.setProperty('display', 'none', 'important');
            }
        };

        // Function to switch to management tab
        const switchToManagementTab = () => {
            if (mobileMembersTab && mobileManagementTab && mobileMembersContent && mobileManagementContent && isMobile()) {
                // Update tab styling
                mobileManagementTab.classList.add('mobile-tab-active');
                mobileManagementTab.classList.remove('bg-slate-700', 'text-white');
                mobileManagementTab.classList.add('bg-mordheim-gold', 'text-slate-900');
                
                mobileMembersTab.classList.remove('mobile-tab-active');
                mobileMembersTab.classList.remove('bg-mordheim-gold', 'text-slate-900');
                mobileMembersTab.classList.add('bg-slate-700', 'text-white');
                
                // Show/hide content with !important to override CSS (only on mobile)
                mobileManagementContent.style.setProperty('display', 'block', 'important');
                mobileMembersContent.style.setProperty('display', 'none', 'important');
            }
        };

        // Function to reset desktop layout
        const resetDesktopLayout = () => {
            if (mobileMembersContent && mobileManagementContent && !isMobile()) {
                // Remove inline styles to let CSS take over
                mobileMembersContent.style.removeProperty('display');
                mobileManagementContent.style.removeProperty('display');
            }
        };

        // Add click listeners for mobile tabs
        mobileMembersTab?.addEventListener('click', switchToMembersTab);
        mobileManagementTab?.addEventListener('click', switchToManagementTab);

        // Function to reset mobile tabs to members view (exported for use in other files)
        window.resetMobileTabs = () => {
            if (isMobile()) {
                switchToMembersTab();
            } else {
                resetDesktopLayout();
            }
        };

        // Handle window resize to switch between mobile/desktop layouts
        window.addEventListener('resize', () => {
            if (!isMobile()) {
                resetDesktopLayout();
            }
        });

        // Initial layout setup
        if (!isMobile()) {
            resetDesktopLayout();
        }

        // Main View Buttons
        const createNewWarbandBtn = document.getElementById('create-new-warband-btn');
        if (createNewWarbandBtn) {
            createNewWarbandBtn.addEventListener('click', () => {
                console.log('Create New Warband button clicked!');
                showNewWarbandModal();
            });
        } else {
            console.error('Create New Warband button not found!');
        }

        // Import & Export Handlers
        const fileInput = document.getElementById('import-file-input');
        const triggerImport = () => {
            if (fileInput) fileInput.click();
        };
        document.getElementById('import-warband-btn')?.addEventListener('click', triggerImport);
        document.getElementById('import-warband-btn-mobile')?.addEventListener('click', triggerImport);
        document.getElementById('quick-import-btn')?.addEventListener('click', triggerImport);

        fileInput?.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                importWarbandJSON(e.target.files[0]);
                e.target.value = '';
            }
        });

        const exportAll = () => exportAllWarbandsJSON();
        document.getElementById('export-all-btn')?.addEventListener('click', exportAll);
        document.getElementById('export-all-btn-mobile')?.addEventListener('click', exportAll);
        document.getElementById('quick-export-all-btn')?.addEventListener('click', exportAll);

        document.getElementById('export-current-warband-btn')?.addEventListener('click', () => {
            if (currentWarband) {
                exportWarbandJSON(currentWarband.id);
            }
        });

        document.getElementById('back-to-warbands-btn').addEventListener('click', () => { setCurrentWarband(showListView(getWarbands())); });
        document.getElementById('change-order-btn').addEventListener('click', () => {
            const newMode = !getIsOrderingMode();
            setIsOrderingMode(newMode);
            // Re-render the roster to show/hide move buttons
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
        });
        document.getElementById('advancement-hub-btn').addEventListener('click', showAdvancementHub);
        document.getElementById('go-to-advancement-btn').addEventListener('click', () => {
            hideModal('fighter-modal');
            showAdvancementHub();
        });
        document.getElementById('add-fighter-btn').addEventListener('click', fighterManagementShowNewFighterModal);
        document.getElementById('print-warband-btn').addEventListener('click', () => {
            const includeNotesCheckbox = document.getElementById('print-include-notes');
            if (includeNotesCheckbox) {
                includeNotesCheckbox.checked = true;
            }
            const includeSkillsCheckbox = document.getElementById('print-include-skills');
            if (includeSkillsCheckbox) {
                includeSkillsCheckbox.checked = true;
            }
            const includeWarbandNotesCheckbox = document.getElementById('print-include-warband-notes');
            if (includeWarbandNotesCheckbox) {
                includeWarbandNotesCheckbox.checked = true;
            }
            displayModal('print-options-modal');
        });

        document.getElementById('cancel-print-btn').addEventListener('click', () => {
            hideModal('print-options-modal');
        });

        document.getElementById('confirm-print-btn').addEventListener('click', () => {
            const includeNotesCheckbox = document.getElementById('print-include-notes');
            const includeNotes = includeNotesCheckbox ? includeNotesCheckbox.checked : false;
            const includeSkillsCheckbox = document.getElementById('print-include-skills');
            const includeSkills = includeSkillsCheckbox ? includeSkillsCheckbox.checked : false;
            const includeWarbandNotesCheckbox = document.getElementById('print-include-warband-notes');
            const includeWarbandNotes = includeWarbandNotesCheckbox ? includeWarbandNotesCheckbox.checked : false;
            hideModal('print-options-modal');
            window.printWarband(includeNotes, includeSkills, includeWarbandNotes);
        });

        document.getElementById('cancel-notes-btn').addEventListener('click', () => {
            hideModal('fighter-notes-modal');
        });

        document.getElementById('save-notes-btn').addEventListener('click', async () => {
            const fighterId = document.getElementById('notes-modal-fighter-id').value;
            const notes = document.getElementById('notes-modal-textarea').value.trim();
            const fighter = currentWarband.members.find(f => f.id === fighterId);
            if (fighter) {
                fighter.notes = notes || undefined;
                await saveWarband();
                renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
            }
            hideModal('fighter-notes-modal');
        });
        document.getElementById('add-storage-btn').addEventListener('click', showAddToStorageModal);
        document.getElementById('view-ledger-btn').addEventListener('click', showLedgerModal);

        // Warband Rating Breakdown
        document.getElementById('warband-rating-label')?.addEventListener('click', () => {
            if (currentWarband && currentWarband.members) {
                import('./WarbandRating/warband-rating-modal.js').then(module => {
                    module.showWarbandRatingBreakdown(currentWarband.members);
                });
            }
        });

        // Turn Actions Button
        document.getElementById('turn-actions-btn').addEventListener('click', () => {
            showTurnOrderTrackerView();
            renderTurnOrderTracker(currentWarband);
        });

        // Battle View Button
        document.getElementById('battle-view-btn').addEventListener('click', () => {
            showBattleView();
        });

        // End Battle Button — opens the new hub modal
        document.getElementById('end-battle-btn').addEventListener('click', () => {
            showEndBattleHub();
        });

        // Back to Warband Editor from Turn Tracker
        document.getElementById('back-to-warband-editor-btn').addEventListener('click', () => {
            showEditorView();
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
        });

        // Back to Warband Editor from Battle View
        document.getElementById('back-to-warband-editor-from-battle-btn').addEventListener('click', () => {
            // Reset battle casualties when leaving battle view
            resetBattleCasualties();
            showEditorView();
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
        });

        // Back to Main from Special Rules View
        document.getElementById('back-to-main-from-special-rules-btn').addEventListener('click', () => {
            showListView(getWarbands());
        });

        // Casualty Modal Event Handlers
        document.getElementById('close-casualty-modal-btn').addEventListener('click', () => {
            document.getElementById('casualty-modal').classList.add('hidden');
        });

        document.getElementById('casualty-no-btn').addEventListener('click', () => {
            document.getElementById('casualty-modal').classList.add('hidden');
        });

        document.getElementById('casualty-yes-btn').addEventListener('click', () => {
            const modal = document.getElementById('casualty-modal');
            const fighterId = modal.dataset.fighterId;
            
            // Apply casualty
            applyCasualty(fighterId);
            
            // Close modal
            modal.classList.add('hidden');
        });

        // Event delegation for casualty buttons
        const battleFightersGrid = document.getElementById('battle-fighters-grid');
        if (battleFightersGrid) {
            battleFightersGrid.addEventListener('click', (e) => {
                const undoBtn = e.target.closest('.undo-casualty-btn');
                if (undoBtn) {
                    e.stopPropagation();
                    undoCasualty(undoBtn.dataset.fighterId);
                    return;
                }
                const casualtyBtn = e.target.closest('.casualty-btn');
                if (casualtyBtn) {
                    const fighterId = casualtyBtn.dataset.fighterId;
                    const fighterName = casualtyBtn.dataset.fighterName;
                    showCasualtyModal(fighterId, fighterName);
                }
            });
        }

        // Battle View Phase Navigation
        document.getElementById('phase-select').addEventListener('change', (e) => {
            const phaseId = parseInt(e.target.value);
            setCurrentPhase(phaseId);
        });

        // Turn Order Tracker - Skill, Special Rule, and Equipment Clicks
        document.getElementById('turn-order-tracker-view').addEventListener('click', (e) => {
            const skillSpan = e.target.closest('[data-skill-name]');
            const ruleSpan = e.target.closest('[data-rule]');
            const equipmentSpan = e.target.closest('[data-equipment-name]');

            if (skillSpan) {
                const skillName = skillSpan.dataset.skillName;
                // Extract base skill name for lookup (handles parameterized skills like Animal Handling (Horse))
                let lookupName = skillName;
                if (skillName.includes(' (')) {
                    lookupName = skillName.substring(0, skillName.indexOf(' ('));
                }
                const fighterId = skillSpan.dataset.fighterId;
                const fighter = fighterId && currentWarband ? currentWarband.members.find(f => f.id === fighterId) : null;
                let skillData = findSkillForWarband(lookupName, null, fighter);
                if (!skillData) {
                    // Check if it's a spell
                    for (const group in MAGIC) {
                        const spell = MAGIC[group].find(s => s.name === skillName);
                        if (spell) {
                            skillData = spell;
                            break;
                        }
                    }
                }

                if (skillData) {
                    document.getElementById('rule-details-title').textContent = skillData.name;
                    
                    // Check if this is a spell (has difficulty property) and format accordingly
                    if (skillData.difficulty !== undefined) {
                        const difficultyText = skillData.difficulty === "Auto" ? "Automatic" : `Difficulty ${skillData.difficulty}`;
                        document.getElementById('rule-details-content').innerHTML = `
                            <div class="mb-2">
                                <strong>Difficulty:</strong> ${difficultyText}
                            </div>
                            <div>
                                <strong>Description:</strong> ${skillData.description}
                            </div>
                        `;
                    } else {
                        // Regular skill
                        document.getElementById('rule-details-content').innerHTML = skillData.rules;
                    }
                    
                    displayModal('rule-details-modal');
                }
            } else if (ruleSpan) {
                const ruleName = ruleSpan.dataset.rule;
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);

                if (ruleData) {
                    document.getElementById('rule-details-title').textContent = ruleData.name;
                    document.getElementById('rule-details-content').innerHTML = ruleData.rules;
                    displayModal('rule-details-modal');
                }
            } else if (equipmentSpan) {
                const equipmentName = equipmentSpan.dataset.equipmentName;
                const ruleName = equipmentSpan.dataset.equipmentRuleName;
                const equipmentData = MASTER_EQUIPMENT_LIST.find(e => e.name === equipmentName);

                if (equipmentData) {
                    let title = equipmentData.name;
                    let content = equipmentData.turnOrderRules || equipmentData.rules;
                    if (ruleName && Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
                        // Filter to show only the specific rule
                        const specificRule = content.find(ruleObj => ruleObj.name === ruleName);
                        if (specificRule) {
                            title += ` - ${ruleName}`;
                            document.getElementById('rule-details-content').innerHTML = `<p><strong>${specificRule.name}:</strong> ${specificRule.rule}</p>`;
                        } else {
                            // Fallback if rule not found
                            document.getElementById('rule-details-content').innerHTML = content.map(ruleObj => `<p><strong>${ruleObj.name}:</strong> ${ruleObj.rule}</p>`).join('');
                        }
                    } else if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
                        // New format: array of objects with name and rule
                        document.getElementById('rule-details-content').innerHTML = content.map(ruleObj => `<p><strong>${ruleObj.name}:</strong> ${ruleObj.rule}</p>`).join('');
                    } else if (Array.isArray(content)) {
                        document.getElementById('rule-details-content').innerHTML = content.map(rule => `<p>${rule}</p>`).join('');
                    } else {
                        document.getElementById('rule-details-content').innerHTML = content.replace(/\n/g, '<br>');
                    }
                    document.getElementById('rule-details-title').textContent = title;
                    displayModal('rule-details-modal');
                }
            }
        });

        // Battle View - Skill, Special Rule, and Equipment Clicks
        document.getElementById('battle-view').addEventListener('click', (e) => {
            const skillSpan = e.target.closest('[data-skill-name]');
            const ruleSpan = e.target.closest('[data-rule]');
            const equipmentSpan = e.target.closest('[data-equipment-name]');

            if (skillSpan) {
                const skillName = skillSpan.dataset.skillName;
                const fighterId = skillSpan.dataset.fighterId;
                showBattleAbilityDetails('skill', skillName, fighterId);
            } else if (ruleSpan) {
                const ruleName = ruleSpan.dataset.rule;
                showBattleAbilityDetails('rule', ruleName);
            } else if (equipmentSpan) {
                const equipmentName = equipmentSpan.dataset.equipmentName;
                const ruleName = equipmentSpan.dataset.equipmentRuleName;
                // Use the same logic as turn order tracker for equipment
                const equipmentData = MASTER_EQUIPMENT_LIST.find(e => e.name === equipmentName);

                if (equipmentData) {
                    let title = equipmentData.name;
                    let content = equipmentData.turnOrderRules || equipmentData.rules;
                    if (ruleName && Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
                        // Filter to show only the specific rule
                        const specificRule = content.find(ruleObj => ruleObj.name === ruleName);
                        if (specificRule) {
                            title += ` - ${ruleName}`;
                            document.getElementById('rule-details-title').textContent = title;
                            document.getElementById('rule-details-content').innerHTML = `<p><strong>${specificRule.name}:</strong> ${specificRule.rule}</p>`;
                            displayModal('rule-details-modal');
                            return;
                        }
                    } else if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
                        // New format: array of objects with name and rule
                        document.getElementById('rule-details-content').innerHTML = content.map(ruleObj => `<p><strong>${ruleObj.name}:</strong> ${ruleObj.rule}</p>`).join('');
                    } else if (Array.isArray(content)) {
                        document.getElementById('rule-details-content').innerHTML = content.map(rule => `<p>${rule}</p>`).join('');
                    } else {
                        document.getElementById('rule-details-content').innerHTML = content.replace(/\n/g, '<br>');
                    }
                    document.getElementById('rule-details-title').textContent = title;
                    displayModal('rule-details-modal');
                }
            }
        });

        // Treasury Buttons
        document.getElementById('add-gc-btn').addEventListener('click', () => updateTreasury('add'));
        document.getElementById('spend-gc-btn').addEventListener('click', () => updateTreasury('subtract'));

        // Treasure Buttons
        document.getElementById('add-treasure-btn').addEventListener('click', () => updateTreasure('add'));
        document.getElementById('spend-treasure-btn').addEventListener('click', () => {
            if (!currentWarband) {
                showMessage('Please load a warband first.', 'error');
                return;
            }
            openSellTreasureModal(currentWarband, currentWarband.treasure || 0);
        });
        document.getElementById('remove-treasure-btn').addEventListener('click', () => removeTreasure());

        // Tab Switching
        document.getElementById('gc-tab').addEventListener('click', () => switchTreasuryTab('gc'));
        document.getElementById('treasure-tab').addEventListener('click', () => switchTreasuryTab('treasure'));
        
        // Setup battle view event listeners
        setupBattleViewEvents();
        
        // Setup skill selection event listeners
        setupSkillSelectionEvents();
        
        // Setup modal event listeners
        setupModalEvents();

        // Options Dropdown
        const optionsDropdownBtn = document.getElementById('options-dropdown-btn');
        const optionsDropdown = document.getElementById('options-dropdown');
        
        // Toggle options dropdown
        optionsDropdownBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns('options-dropdown');
            optionsDropdown.classList.toggle('hidden');
        });
        
        // Close options dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!optionsDropdownBtn?.contains(e.target) && !optionsDropdown?.contains(e.target)) {
                optionsDropdown?.classList.add('hidden');
            }
        });

        // House Rules Button (now in dropdown)
        document.getElementById('house-rules-btn').addEventListener('click', () => {
            optionsDropdown.classList.add('hidden'); // Close dropdown
            displayModal('house-rules-modal');
            // Sync the modal toggles with the stored state
            const mainToggle = document.getElementById('house-rule-toggle');
            const modalToggle = document.getElementById('modal-house-rule-toggle');
            const modalBlackpowderToggle = document.getElementById('modal-blackpowder-discount-toggle');
            const modalLuckyItemsToggle = document.getElementById('modal-lucky-items-limit-toggle');
            const modalUniversalHiringToggle = document.getElementById('modal-universal-hiring-access-toggle');
            const modalExcludeStartingXpToggle = document.getElementById('modal-exclude-starting-xp-toggle');
            const modalFullyPaintedToggle = document.getElementById('fully-painted-toggle');
            const modalIgnoreRacialMaximumsToggle = document.getElementById('modal-ignore-racial-maximums-toggle');

            modalToggle.checked = mainToggle.checked;

            // Sync blackpowder discount toggle with stored value
            const storedBlackpowderRule = localStorage.getItem('isBlackpowderPreGameDiscountActive');
            modalBlackpowderToggle.checked = storedBlackpowderRule === 'true';

            // Sync blackpowder 20% discount toggle with stored value
            const modalBlackpowder20PctToggle = document.getElementById('modal-blackpowder-20pct-discount-toggle');
            const storedBlackpowder20PctRule = localStorage.getItem('isBlackpowder20PercentDiscountActive');
            modalBlackpowder20PctToggle.checked = storedBlackpowder20PctRule === 'true';

            // Sync lucky items limit toggle with current warband setting
            import('./state.js').then(stateModule => {
                modalLuckyItemsToggle.checked = stateModule.isLuckyItemsLimited;
                modalUniversalHiringToggle.checked = stateModule.isUniversalHiringAccessActive;
                modalExcludeStartingXpToggle.checked = stateModule.isExcludeStartingXpFromRatingActive;
                modalFullyPaintedToggle.checked = stateModule.isFullyPaintedActive;
                modalIgnoreRacialMaximumsToggle.checked = stateModule.isIgnoreRacialMaximumsActive;

                // Sync armour/shield discount toggle with stored value
                const modalArmourShieldToggle = document.getElementById('modal-armour-shield-discount-toggle');
                const storedArmourShieldRule = localStorage.getItem('isArmourShieldHalfCostActive');
                if (modalArmourShieldToggle) {
                    modalArmourShieldToggle.checked = storedArmourShieldRule === 'true';
                }
            });
        });

        // House Rule Toggle
        document.getElementById('house-rule-toggle').addEventListener('change', handleHouseRuleChange);

        // Modal House Rule Toggle
        document.getElementById('modal-house-rule-toggle').addEventListener('change', () => {
            const mainToggle = document.getElementById('house-rule-toggle');
            mainToggle.checked = document.getElementById('modal-house-rule-toggle').checked;
            handleHouseRuleChange();
        });

        // Blackpowder Pre-Game Discount House Rule Toggle
        document.getElementById('modal-blackpowder-discount-toggle').addEventListener('change', () => {
            const isChecked = document.getElementById('modal-blackpowder-discount-toggle').checked;
            setIsBlackpowderPreGameDiscountActive(isChecked);
            localStorage.setItem('isBlackpowderPreGameDiscountActive', isChecked);

            // Re-render equipment options if fighter modal is open
            const fighterModal = document.getElementById('fighter-modal');
            if (fighterModal && !fighterModal.classList.contains('hidden')) {
                renderEquipmentOptions();
                renderModalEquipmentOptions();
            }
        });

        // Blackpowder 20% Discount House Rule Toggle
        document.getElementById('modal-blackpowder-20pct-discount-toggle').addEventListener('change', () => {
            const isChecked = document.getElementById('modal-blackpowder-20pct-discount-toggle').checked;
            setIsBlackpowder20PercentDiscountActive(isChecked);
            localStorage.setItem('isBlackpowder20PercentDiscountActive', isChecked);

            // Re-render equipment options if fighter modal is open
            const fighterModal20 = document.getElementById('fighter-modal');
            if (fighterModal20 && !fighterModal20.classList.contains('hidden')) {
                renderEquipmentOptions();
                renderModalEquipmentOptions();
            }
        });

        // Lucky Items Limit House Rule Toggle
        document.getElementById('modal-lucky-items-limit-toggle').addEventListener('change', async () => {
            const isChecked = document.getElementById('modal-lucky-items-limit-toggle').checked;
            import('./state.js').then(stateModule => {
                stateModule.setIsLuckyItemsLimited(isChecked);
                // Save the warband instead of localStorage
                import('./warband-service.js').then(service => {
                    service.saveWarband();
                });
            });

            // Re-render equipment options if fighter modal is open
            const fighterModal = document.getElementById('fighter-modal');
            if (fighterModal && !fighterModal.classList.contains('hidden')) {
                renderEquipmentOptions();
                renderModalEquipmentOptions();
            }
        });

        // Universal Hiring Access House Rule Toggle
        document.getElementById('modal-universal-hiring-access-toggle').addEventListener('change', async () => {
            const isChecked = document.getElementById('modal-universal-hiring-access-toggle').checked;
            import('./state.js').then(stateModule => {
                stateModule.setIsUniversalHiringAccessActive(isChecked);
            });
            
            // Save to localStorage for persistence
            localStorage.setItem('isUniversalHiringAccessActive', isChecked);
            
            // Update warband data
            if (currentWarband) {
                currentWarband.universal_hiring_access = isChecked;
                import('./warband-service.js').then(warbandService => {
                    warbandService.saveWarband();
                });
            }
        });

        // Exclude Starting XP from Rating House Rule Toggle
        document.getElementById('modal-exclude-starting-xp-toggle').addEventListener('change', async () => {
            const isChecked = document.getElementById('modal-exclude-starting-xp-toggle').checked;
            import('./state.js').then(stateModule => {
                stateModule.setIsExcludeStartingXpFromRatingActive(isChecked);
            });
            
            // Save to localStorage for persistence
            localStorage.setItem('isExcludeStartingXpFromRatingActive', isChecked);
            
            // Recalculate warband rating to reflect the change immediately
            if (currentWarband) {
                import('./warband-service.js').then(warbandService => {
                    warbandService.saveWarband();
                });
            }
        });

        // Fully Painted House Rule Toggle
        document.getElementById('fully-painted-toggle').addEventListener('change', handleFullyPaintedChange);

        // Ignore Racial Maximums House Rule Toggle
        document.getElementById('modal-ignore-racial-maximums-toggle').addEventListener('change', async () => {
            const isChecked = document.getElementById('modal-ignore-racial-maximums-toggle').checked;
            import('./state.js').then(stateModule => {
                stateModule.setIsIgnoreRacialMaximumsActive(isChecked);
                if (currentWarband) {
                    currentWarband.ignore_racial_maximums = isChecked;
                    import('./warband-service.js').then(warbandService => {
                        warbandService.saveWarband();
                    });
                }
            });
        });

        // Armour & Shield 50% Cost Reduction House Rule Toggle
        document.getElementById('modal-armour-shield-discount-toggle').addEventListener('change', () => {
            const isChecked = document.getElementById('modal-armour-shield-discount-toggle').checked;
            setIsArmourShieldHalfCostActive(isChecked);
            localStorage.setItem('isArmourShieldHalfCostActive', isChecked);

            // Re-render equipment options if fighter modal is open
            const fighterModalArmour = document.getElementById('fighter-modal');
            if (fighterModalArmour && !fighterModalArmour.classList.contains('hidden')) {
                renderEquipmentOptions();
                renderModalEquipmentOptions();
            }
        });

        // Pre-Game Toggle
        document.getElementById('pre-game-toggle').addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            if (!isChecked) {
                // User is trying to turn off Pre-Game mode - show confirmation
                e.preventDefault(); // Prevent the change
                e.target.checked = true; // Keep it checked
                showConfirmationModal(
                    "Are you done building the warband? Doing so will put the roster out of pre game build phase",
                    async () => {
                        // User confirmed - turn off Pre-Game mode
                        currentWarband.pre_game = false;
                        e.target.checked = false;
                        await saveWarband();
                        // Update UI
                        const statusText = document.getElementById('pre-game-status');
                        statusText.textContent = 'Pre-Game build phase completed';
                        // Re-render to update alignment display mode
                        renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
                    }
                );
            } else {
                // User is turning on Pre-Game mode - show confirmation
                e.preventDefault(); // Prevent the change
                e.target.checked = false; // Keep it unchecked
                showConfirmationModal(
                    "Warning, chaning back to Pre-Game Mode will enable some rules that are intended to only be used during pre-game mode, for example reduced cost of items during roster builiding",
                    async () => {
                        // User confirmed - turn on Pre-Game mode
                        currentWarband.pre_game = true;
                        e.target.checked = true;
                        await saveWarband();
                        // Update UI
                        const statusText = document.getElementById('pre-game-status');
                        statusText.textContent = 'Currently in Pre-Game build phase';
                        // Re-render to update alignment display mode
                        renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
                    }
                );
            }
        });

        // Alignment Change Handler
        document.getElementById('alignment-select').addEventListener('change', async (e) => {
            const newAlignment = e.target.value;
            if (currentWarband && currentWarband.alignment !== newAlignment) {
                currentWarband.alignment = newAlignment;
                await saveWarband();
                // Update display text
                const alignmentText = document.getElementById('alignment-text');
                alignmentText.textContent = newAlignment.charAt(0).toUpperCase() + newAlignment.slice(1);
                showMessage(`Warband alignment changed to ${newAlignment}.`, 'success');
            }
        });

        // Pre-Game Alignment Change Handler
        document.getElementById('pre-game-alignment-select').addEventListener('change', async (e) => {
            const newAlignment = e.target.value;
            if (currentWarband && currentWarband.alignment !== newAlignment) {
                currentWarband.alignment = newAlignment;
                await saveWarband();
                // Update both alignment displays
                const alignmentText = document.getElementById('alignment-text');
                const alignmentSelect = document.getElementById('alignment-select');
                alignmentText.textContent = newAlignment.charAt(0).toUpperCase() + newAlignment.slice(1);
                alignmentSelect.value = newAlignment;
                showMessage(`Warband alignment changed to ${newAlignment}.`, 'success');
            }
        });

        // Pre-Game Build Phase: warband-specific event listeners (e.g., Aristocracy of the Night)
        setupPreGameEventListeners(() => currentWarband);

        // Game Tracker Handlers
        document.getElementById('increase-games-btn').addEventListener('click', async () => {
            if (currentWarband) {
                const previousGames = currentWarband.games_played || 0;
                const newGames = previousGames + 1;
                currentWarband.games_played = newGames;
                
                // Record automatic upkeep costs
                await recordUpkeepCosts(previousGames, newGames);
                
                await saveWarband();
                document.getElementById('games-played-count').textContent = currentWarband.games_played;
                showMessage('Games played increased to ' + currentWarband.games_played, 'success');
            }
        });

        document.getElementById('decrease-games-btn').addEventListener('click', async () => {
            if (currentWarband && currentWarband.games_played > 0) {
                currentWarband.games_played = currentWarband.games_played - 1;
                await saveWarband();
                document.getElementById('games-played-count').textContent = currentWarband.games_played;
                showMessage('Games played decreased to ' + currentWarband.games_played, 'success');
            }
        });

        // Warband Notes
        document.getElementById('warband-notes').addEventListener('change', saveWarband);

        // Toggle Notes Section
        document.getElementById('toggle-notes-btn').addEventListener('click', () => {
            const notesTextarea = document.getElementById('warband-notes');
            const chevronIcon = document.querySelector('#toggle-notes-btn i');

            if (notesTextarea.classList.contains('hidden')) {
                // Expand
                notesTextarea.classList.remove('hidden');
                chevronIcon.classList.remove('fa-chevron-up');
                chevronIcon.classList.add('fa-chevron-down');
            } else {
                // Collapse
                notesTextarea.classList.add('hidden');
                chevronIcon.classList.remove('fa-chevron-down');
                chevronIcon.classList.add('fa-chevron-up');
            }
        });

        // Toggle Special Rules Section
        document.getElementById('toggle-special-rules-btn').addEventListener('click', () => {
            const specialRulesDiv = document.getElementById('warband-special-rules');
            const chevronIcon = document.querySelector('#toggle-special-rules-btn i');

            if (specialRulesDiv.classList.contains('hidden')) {
                // Expand
                specialRulesDiv.classList.remove('hidden');
                chevronIcon.classList.remove('fa-chevron-up');
                chevronIcon.classList.add('fa-chevron-down');
            } else {
                // Collapse
                specialRulesDiv.classList.add('hidden');
                chevronIcon.classList.remove('fa-chevron-down');
                chevronIcon.classList.add('fa-chevron-up');
            }
        });

        // New Warband Modal Buttons
        document.getElementById('cancel-new-warband-btn').addEventListener('click', () => hideModal('new-warband-modal'));
        document.getElementById('create-warband-confirm-btn').addEventListener('click', async () => {
            console.log('Create Warband button clicked');
            const name = document.getElementById('new-warband-name').value.trim();
            const type = document.getElementById('new-warband-type').value.trim();
            console.log('New Warband Name:', name, 'Type:', type);

            // Intercept Ostermark creation to show skill set selection modal
            if (type === 'Mercenaries (Ostermark)') {
                const skillSet = await showOstermarkSkillSetModal();
                if (!skillSet) {
                    // User cancelled — do not create the warband
                    return;
                }
                await createNewWarband(name, type, hideModal, loadWarband, { skillSet });
            } else {
                await createNewWarband(name, type, hideModal, loadWarband);
            }
            showEditorView(); // Automatically open the editor after creating and loading
        });

        // Rename Warband Modal Buttons
        document.getElementById('cancel-rename-warband-btn').addEventListener('click', () => hideModal('rename-warband-modal'));
        document.getElementById('rename-warband-confirm-btn').addEventListener('click', async () => {
            const modal = document.getElementById('rename-warband-modal');
            const warbandId = modal.dataset.warbandId;
            const newName = document.getElementById('rename-warband-name').value.trim();
            
            if (warbandId && newName) {
                await renameWarband(warbandId, newName);
                hideModal('rename-warband-modal');
            }
        });

        // Authentication Buttons
        document.getElementById('login-btn').addEventListener('click', showAuthModal);
        document.getElementById('logout-btn').addEventListener('click', async () => {
            try {
                // Unsubscribe from Firestore listeners before logout to prevent permission errors
                unsubscribeFromWarbands();
                trackEvent('logout');
                await logout();
            } catch (error) {
                console.error('Logout error:', error);
            }
        });

        // Auth Modal Tabs
        document.getElementById('login-tab').addEventListener('click', switchToLoginTab);
        document.getElementById('register-tab').addEventListener('click', switchToRegisterTab);

        // Auth Modal Buttons
        document.getElementById('cancel-auth-btn').addEventListener('click', hideAuthModal);

        // Login Form
        document.getElementById('login-form-element').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();

            if (!email || !password) {
                showAuthError('login', 'Please fill in all fields.');
                return;
            }

            try {
                await loginWithEmailPassword(email, password);
                hideAuthModal();
            } catch (error) {
                showAuthError('login', error.message || 'Login failed.');
            }
        });

        // Register Form
        document.getElementById('register-form-element').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value.trim();

            if (!email || !password) {
                showAuthError('register', 'Please fill in all fields.');
                return;
            }

            try {
                await registerWithEmailPassword(email, password);
                hideAuthModal();
            } catch (error) {
                showAuthError('register', error.message || 'Registration failed.');
            }
        });

        // Google Login
        document.getElementById('google-login-btn').addEventListener('click', async () => {
            try {
                await loginWithGoogle();
                hideAuthModal();
            } catch (error) {
                showAuthError('login', error.message || 'Google login failed.');
            }
        });

        // Forgot Password Link
        document.getElementById('forgot-password-link').addEventListener('click', (e) => {
            e.preventDefault();
            showResetPasswordForm();
        });

        // Back to Login Link
        document.getElementById('back-to-login-link').addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });

        // Reset Password Form
        document.getElementById('reset-password-form-element').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('reset-email').value.trim();

            if (!email) {
                document.getElementById('reset-error').textContent = 'Please enter your email address.';
                document.getElementById('reset-error').classList.remove('hidden');
                document.getElementById('reset-success').classList.add('hidden');
                return;
            }

            try {
                await resetPassword(email);
                document.getElementById('reset-success').textContent = 'Password reset email sent! Check your inbox.';
                document.getElementById('reset-success').classList.remove('hidden');
                document.getElementById('reset-error').classList.add('hidden');
            } catch (error) {
                document.getElementById('reset-error').textContent = error.message || 'Failed to send reset email.';
                document.getElementById('reset-error').classList.remove('hidden');
                document.getElementById('reset-success').classList.add('hidden');
            }
        });

        // Initialize fighter management event listeners
        initFighterManagement(saveWarband);

        // Style Selection Event Listener
        document.getElementById('f-style-choice').addEventListener('change', () => {
            // Import handleStyleSelection from ui.js
            import('./ui.js').then(module => {
                module.handleStyleSelection();
            });
        });

        // --- Event Delegation for Dynamically Generated Content ---

        // Warband List Clicks
        document.getElementById('warbands-container').addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            const { action, warbandId, warbandName } = button.dataset;

            if (action === 'load-warband') {
                loadWarband(warbandId);
                showEditorView();
            } else if (action === 'copy-warband') {
                copyWarband(warbandId);
            } else if (action === 'rename-warband') {
                showRenameWarbandModal(warbandId, warbandName);
            } else if (action === 'export-warband') {
                exportWarbandJSON(warbandId);
            } else if (action === 'delete-warband') {
                confirmDeleteWarbandFromList(warbandId, warbandName);
            } else if (action === 'toggle-warband-menu') {
                toggleWarbandMenu(warbandId);
            }
        });

        // Roster and Stored Equipment Clicks
        document.getElementById('warband-editor-view').addEventListener('click', (e) => {
            const ruleSpan = e.target.closest('[data-rule]');
            if (ruleSpan) {
                const ruleName = ruleSpan.dataset.rule;
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);

                if (ruleData) {
                    document.getElementById('rule-details-title').textContent = ruleData.name;
                    document.getElementById('rule-details-content').innerHTML = ruleData.rules;
                    displayModal('rule-details-modal');
                }
                return;
            }

            const equipmentSpan = e.target.closest('[data-equipment-name]');
            if (equipmentSpan) {
                const equipmentName = equipmentSpan.dataset.equipmentName;
                const equipmentRules = JSON.parse(decodeURIComponent(equipmentSpan.dataset.equipmentRules));
                const equipmentCost = equipmentSpan.dataset.equipmentCost;
                showEquipmentDetailsModal(equipmentName, equipmentRules, equipmentCost);
                return;
            }

            const button = e.target.closest('button');
            if (!button) return;

            const { action, fighterId, itemIndex, itemName, itemCost, itemQuantity } = button.dataset;

            if (action === 'edit-fighter') {
                editFighter(fighterId, saveWarband);
            } else if (action === 'gear-fighter') {
                openGearModal(fighterId, saveWarband);
            } else if (action === 'edit-notes') {
                const fighter = currentWarband.members.find(f => f.id === fighterId);
                if (fighter) {
                    document.getElementById('notes-modal-title').textContent = `Notes for ${fighter.name}`;
                    document.getElementById('notes-modal-fighter-id').value = fighterId;
                    document.getElementById('notes-modal-textarea').value = fighter.notes || '';
                    displayModal('fighter-notes-modal');
                }
            } else if (action === 'move-fighter-up') {
                moveFighterUp(fighterId);
            } else if (action === 'move-fighter-down') {
                moveFighterDown(fighterId);
            } else if (action === 'take-from-storage') {
                takeFromStorage(parseInt(itemIndex));
            } else if (action === 'sell-from-storage') {
                showSellFromStorageModal(itemName, parseInt(itemCost), parseInt(itemQuantity));
            }
        });

        // Cost Breakdown Modal
        document.getElementById('cost-breakdown-btn').addEventListener('click', showCostBreakdownModal);
        document.getElementById('close-cost-breakdown-btn').addEventListener('click', () => hideModal('cost-breakdown-modal'));

        // Fighter Modal Rule and Skill Click Handlers
        document.getElementById('fighter-modal').addEventListener('click', (e) => {
            const skillSpan = e.target.closest('[data-skill]');
            const ruleSpan = e.target.closest('[data-rule]');
            const button = e.target.closest('button');

            if (skillSpan) {
                const skillName = skillSpan.dataset.skill;
                // Extract base skill name for lookup (handles parameterized skills like Animal Handling (Horse))
                let lookupName = skillName;
                if (skillName.includes(' (')) {
                    lookupName = skillName.substring(0, skillName.indexOf(' ('));
                }
                const fighterId = skillSpan.dataset.fighterId;
                const fighter = fighterId && currentWarband ? currentWarband.members.find(f => f.id === fighterId) : null;
                let skillData = findSkillForWarband(lookupName, null, fighter);
                if (!skillData) {
                    // Check if it's a spell
                    for (const group in MAGIC) {
                        const spell = MAGIC[group].find(s => s.name === skillName);
                        if (spell) {
                            skillData = spell;
                            break;
                        }
                    }
                }

                if (skillData) {
                    document.getElementById('rule-details-title').textContent = skillData.name;
                    
                    // Check if this is a spell (has difficulty property) and format accordingly
                    if (skillData.difficulty !== undefined) {
                        const difficultyText = skillData.difficulty === "Auto" ? "Automatic" : `Difficulty ${skillData.difficulty}`;
                        document.getElementById('rule-details-content').innerHTML = `
                            <div class="mb-2">
                                <strong>Difficulty:</strong> ${difficultyText}
                            </div>
                            <div>
                                <strong>Description:</strong> ${skillData.description}
                            </div>
                        `;
                    } else {
                        // Regular skill
                        document.getElementById('rule-details-content').innerHTML = skillData.rules;
                    }
                    
                    displayModal('rule-details-modal');
                }
            } else if (ruleSpan) {
                const ruleName = ruleSpan.dataset.rule;
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);

                if (ruleData) {
                    document.getElementById('rule-details-title').textContent = ruleData.name;
                    document.getElementById('rule-details-content').innerHTML = ruleData.rules;
                    displayModal('rule-details-modal');
                }
            } else if (button && button.dataset.action === 'remove-skill') {
                const skillName = button.dataset.skillName;
                const skillIndex = parseInt(button.dataset.skillIndex);
                removeSkill(skillName, skillIndex, saveWarband);
            } else if (button && button.id === 'select-equipment-btn') {
                showEquipmentSelectionModal();
            } else if (button && button.id === 'reorder-equipment-btn') {
                if (!button.disabled) showEquipmentReorderModal();
            }
        });

        // Equipment Selection Modal Event Handlers
        document.getElementById('equipment-selection-modal').addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button && button.dataset.action === 'add-equipment-from-modal') {
                const itemId = parseInt(button.dataset.itemId);
                
                // Check for custom cost input first
                const customCostInput = document.getElementById('fighter-custom-cost-input');
                let customCost = null;
                if (customCostInput && customCostInput.value) {
                    customCost = parseFloat(customCostInput.value) || null;
                }
                
                // If no custom cost, use the button's dataset cost
                if (!customCost) {
                    customCost = button.dataset.cost ? parseFloat(button.dataset.cost) : null;
                }
                
                const customRules = button.dataset.rules || null;
                const customName = button.dataset.modifiedName || null;
                addEquipment(itemId, customCost, customRules, customName);
                hideModal('equipment-selection-modal');
            } else if (button && button.id === 'close-equipment-selection-btn') {
                hideModal('equipment-selection-modal');
            }
        });

        // Modal equipment category select change handler
        document.getElementById('modal-equipment-category-select').addEventListener('change', renderModalEquipmentOptions);

        // Equipment Details Modal Close Button
        document.getElementById('close-equipment-details-btn').addEventListener('click', () => hideModal('equipment-details-modal'));

        // House Rules Modal Close Button
        document.getElementById('close-house-rules-btn').addEventListener('click', () => hideModal('house-rules-modal'));

        // Confirmation Modal Cancel Button
        document.getElementById('cancel-confirmation-btn').addEventListener('click', () => hideModal('confirmation-modal'));

        // Blog Link and Modal
        document.getElementById('blog-link').addEventListener('click', () => {
            trackPageAccess('blog');
            openBlogModal();
        });
        document.getElementById('close-blog-btn').addEventListener('click', () => hideModal('blog-modal'));

        // Change Log Link and Modal
        document.getElementById('changelog-link').addEventListener('click', () => {
            trackPageAccess('change_log');
            displayModal('changelog-modal');
        });
        document.getElementById('close-changelog-btn').addEventListener('click', () => hideModal('changelog-modal'));

        // Special Rules Button
        const specialRulesBtn = document.getElementById('special-rules-btn');
        if (specialRulesBtn) {
            specialRulesBtn.addEventListener('click', () => {
                trackSpecialRulesAccess('desktop');
                document.getElementById('data-dropdown')?.classList.add('hidden');
                import('./special-rules-modal.js').then(module => {
                    module.showSpecialRulesView();
                });
            });
        }

        // Rules Button
        const rulesBtn = document.getElementById('rules-btn');
        if (rulesBtn) {
            rulesBtn.addEventListener('click', () => {
                trackPageAccess('rules');
                document.getElementById('data-dropdown')?.classList.add('hidden');
                import('./rules-modal.js').then(module => {
                    module.showRulesView();
                });
            });
        }

        // Data Dropdown
        const dataDropdownBtn = document.getElementById('data-dropdown-btn');
        const dataDropdown = document.getElementById('data-dropdown');
        const characterReviewDropdownBtn = document.getElementById('character-review-dropdown-btn');
        const characterSubmenu = document.getElementById('character-submenu');
        
        if (dataDropdownBtn && dataDropdown) {
            dataDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns('data-dropdown');
                dataDropdown.classList.toggle('hidden');
            });

            // Character submenu toggle
            if (characterReviewDropdownBtn && characterSubmenu) {
                characterReviewDropdownBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    characterSubmenu.classList.toggle('hidden');
                    
                    // Toggle chevron direction
                    const chevron = characterReviewDropdownBtn.querySelector('i');
                    if (chevron) {
                        chevron.classList.toggle('fa-chevron-down');
                        chevron.classList.toggle('fa-chevron-right');
                    }
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dataDropdown.contains(e.target) && e.target !== dataDropdownBtn) {
                    dataDropdown.classList.add('hidden');
                    // Also close character submenu
                    if (characterSubmenu) {
                        characterSubmenu.classList.add('hidden');
                        const chevron = characterReviewDropdownBtn?.querySelector('i');
                        if (chevron) {
                            chevron.classList.remove('fa-chevron-down');
                            chevron.classList.add('fa-chevron-right');
                        }
                    }
                }
            });

            // Prevent dropdown clicks from bubbling to document
            dataDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Blog Dropdown
        const blogDropdownBtn = document.getElementById('blog-dropdown-btn');
        const blogDropdown = document.getElementById('blog-dropdown');
        
        if (blogDropdownBtn && blogDropdown) {
            blogDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns('blog-dropdown');
                blogDropdown.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!blogDropdown.contains(e.target) && e.target !== blogDropdownBtn) {
                    blogDropdown.classList.add('hidden');
                }
            });

            // Prevent dropdown clicks from bubbling to document
            blogDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Helper Dropdown
        const helperDropdownBtn = document.getElementById('helper-dropdown-btn');
        const helperDropdown = document.getElementById('helper-dropdown');
        
        if (helperDropdownBtn && helperDropdown) {
            helperDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns('helper-dropdown');
                helperDropdown.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!helperDropdown.contains(e.target) && e.target !== helperDropdownBtn) {
                    helperDropdown.classList.add('hidden');
                }
            });

            // Prevent dropdown clicks from bubbling to document
            helperDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Mobile Helper dropdown
        const mobileHelperBtn = document.getElementById('mobile-helper-btn');
        const mobileHelperSubmenu = document.getElementById('mobile-helper-submenu');
        
        if (mobileHelperBtn && mobileHelperSubmenu) {
            mobileHelperBtn.addEventListener('click', () => {
                mobileHelperSubmenu.classList.toggle('hidden');
            });
        }

        // Special Thanks Link and Modal
        const specialThanksBtn = document.getElementById('special-thanks-btn');
        if (specialThanksBtn) {
            specialThanksBtn.addEventListener('click', () => displayModal('special-thanks-modal'));
        }

        // Feedback Link and Modal - Legacy support for old button ID
        const feedbackBtn = document.getElementById('feedback-btn');
        if (feedbackBtn) {
            feedbackBtn.addEventListener('click', () => {
                trackPageAccess('feedback');
                import('./feedback.js').then(module => {
                    module.showFeedbackModal();
                });
            });
        }
        
        // New Feedback Dropdown functionality is handled in feedback-status-modal.js
        
        // Feedback Modal Event Listeners
        document.getElementById('close-feedback-modal-btn')?.addEventListener('click', hideFeedbackModal);
        document.getElementById('cancel-feedback-btn')?.addEventListener('click', hideFeedbackModal);
        document.getElementById('feedback-form')?.addEventListener('submit', handleFeedbackSubmit);

        // Old End Battle Modal Event Handlers (deprecated — now handled by end-battle-hub.js)
        // These handlers remain for backward compatibility with the old modal DOM elements
        document.getElementById('close-end-battle-modal-btn')?.addEventListener('click', () => hideModal('end-battle-modal'));
        document.getElementById('cancel-end-battle-btn')?.addEventListener('click', () => hideModal('end-battle-modal'));
        
        document.getElementById('battle-victory-btn')?.addEventListener('click', () => {
            setBattleResult('victory');
        });
        
        document.getElementById('battle-defeat-btn')?.addEventListener('click', () => {
            setBattleResult('defeat');
        });
        
        document.getElementById('confirm-end-battle-btn')?.addEventListener('click', () => {
            processBattleEnd();
        });

        // Post-Battle Choice Modal Event Handlers
        document.getElementById('close-post-battle-choice-btn').addEventListener('click', () => {
            hideModal('post-battle-choice-modal');
            resetBattleCasualties();
            showEditorView();
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
        });
        
        document.getElementById('warband-page-btn').addEventListener('click', () => {
            hideModal('post-battle-choice-modal');
            resetBattleCasualties();
            showEditorView();
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
        });
        
        document.getElementById('do-exploration-btn').addEventListener('click', () => {
            hideModal('post-battle-choice-modal');
            // The exploration modal will be shown from ui.js
            showExplorationModal();
        });

        // Exploration Modal Event Handlers
        document.getElementById('close-exploration-modal-btn').addEventListener('click', () => {
            hideModal('exploration-modal');
            resetBattleCasualties();
            showEditorView();
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
        });
        
        document.getElementById('continue-from-exploration-btn').addEventListener('click', () => {
            hideModal('exploration-modal');
            showTreasureExplorationModal();
        });

        // Treasure Exploration Modal Event Handlers
        document.getElementById('close-treasure-exploration-modal-btn').addEventListener('click', () => {
            hideModal('treasure-exploration-modal');
        });

        document.getElementById('back-to-exploration-btn').addEventListener('click', () => {
            hideModal('treasure-exploration-modal');
            showExplorationModal();
        });

        document.getElementById('calculate-treasure-btn').addEventListener('click', handleTreasureCalculation);

        document.getElementById('apply-treasure-btn').addEventListener('click', applyTreasureToWarband);

        // Sell Treasure Modal Event Handlers
        document.getElementById('close-sell-treasure-modal-btn').addEventListener('click', closeSellTreasureModal);
        document.getElementById('cancel-sell-treasure-btn').addEventListener('click', closeSellTreasureModal);
        document.getElementById('sell-treasure-btn').addEventListener('click', showSellConfirmation);
        
        // Sell Treasure Confirmation Modal Event Handlers
        document.getElementById('cancel-sell-confirmation-btn').addEventListener('click', cancelSellConfirmation);
        document.getElementById('confirm-sell-confirmation-btn').addEventListener('click', confirmSellConfirmation);

        // Replenish Henchmen Modal Event Handlers
        document.getElementById('replenish-henchmen-btn').addEventListener('click', showReplenishHenchmenModal);
        document.getElementById('close-replenish-henchmen-modal-btn').addEventListener('click', closeReplenishModal);
        document.getElementById('cancel-replenish-btn').addEventListener('click', closeReplenishModal);
        document.getElementById('set-replenish-btn').addEventListener('click', setReplenishmentChanges);

        // Dice input mode toggle
        document.querySelectorAll('input[name="dice-input-mode"]').forEach(radio => {
            radio.addEventListener('change', toggleDiceInputMode);
        });

        // Individual dice input change handlers
        document.querySelectorAll('.dice-input').forEach(input => {
            input.addEventListener('input', updateCalculatedTotal);
            input.addEventListener('focus', () => input.select());
        });

        // Total dice input focus handler
        const totalDiceInput = document.getElementById('total-dice-input');
        if (totalDiceInput) {
            totalDiceInput.addEventListener('focus', () => totalDiceInput.select());
        }

        // Advanced dice count input handler
        const diceCountInput = document.getElementById('total-dice-count-input');
        if (diceCountInput) {
            diceCountInput.addEventListener('input', () => {
                let count = parseInt(diceCountInput.value) || 0;
                // Limit to 1-10
                if (count < 1) count = 1;
                if (count > 10) count = 10;
                diceCountInput.value = count;
                generateAdvancedDiceInputs(count);
            });
            diceCountInput.addEventListener('focus', () => diceCountInput.select());
        }

        // Advanced locked toggle handler
        const lockedToggle = document.getElementById('advanced-locked-toggle');
        if (lockedToggle) {
            lockedToggle.addEventListener('change', toggleAdvancedLocked);
        }

        // Maximize total button handler
        const maximizeTotalBtn = document.getElementById('maximize-total-btn');
        if (maximizeTotalBtn) {
            maximizeTotalBtn.addEventListener('click', maximizeTotalDice);
        }

        // Event delegation for Select result buttons (dynamically generated)
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('select-result-btn') && !event.target.disabled) {
                const resultData = event.target.dataset.resultData;
                if (resultData) {
                    const result = JSON.parse(resultData);
                    selectDiceForResult(result);
                }
            }
        });

        // Experience Options Event Handlers
        document.getElementById('xp-survival').addEventListener('change', () => {
            const battleResultText = document.getElementById('battle-result-text').textContent;
            if (battleResultText && battleResultText !== 'Select battle result to continue') {
                renderExperienceSection();
            }
        });
        
        document.getElementById('xp-winning-leader').addEventListener('change', () => {
            const battleResultText = document.getElementById('battle-result-text').textContent;
            if (battleResultText && battleResultText !== 'Select battle result to continue') {
                renderExperienceSection();
            }
        });
        
        document.getElementById('xp-per-enemy').addEventListener('change', () => {
            const battleResultText = document.getElementById('battle-result-text').textContent;
            if (battleResultText && battleResultText !== 'Select battle result to continue') {
                renderExperienceSection();
            }
        });
        
        document.getElementById('xp-underdog').addEventListener('change', () => {
            updateUnderdogRatingDisplay();
            const battleResultText = document.getElementById('battle-result-text').textContent;
            if (battleResultText && battleResultText !== 'Select battle result to continue') {
                renderExperienceSection();
            }
        });
        
        document.getElementById('opponent-rating').addEventListener('input', () => {
            updateUnderdogRatingDisplay();
            const battleResultText = document.getElementById('battle-result-text').textContent;
            if (battleResultText && battleResultText !== 'Select battle result to continue') {
                renderExperienceSection();
            }
        });

            });
};

/** Switches between Gold Crowns, Treasure, and Ledger tabs in the Treasury section */
export const switchTreasuryTab = (tab) => {
    const gcTab = document.getElementById('gc-tab');
    const treasureTab = document.getElementById('treasure-tab');
    const ledgerTab = document.getElementById('ledger-tab');
    const gcContent = document.getElementById('gc-content');
    const treasureContent = document.getElementById('treasure-content');
    const ledgerContent = document.getElementById('ledger-content');

    // Reset all tab styles
    const defaultTabStyle = 'px-4 py-2 text-sm font-medium rounded-t-md text-slate-400 hover:text-white transition-colors border border-slate-600 border-b-0';
    const activeTabStyle = 'px-4 py-2 text-sm font-medium rounded-t-md bg-mordheim-gold text-slate-900 transition-colors border border-mordheim-gold border-b-0';
    
    if (gcTab) gcTab.className = defaultTabStyle;
    if (treasureTab) treasureTab.className = defaultTabStyle;
    if (ledgerTab) ledgerTab.className = defaultTabStyle;
    
    // Hide all content
    if (gcContent) gcContent.classList.add('hidden');
    if (treasureContent) treasureContent.classList.add('hidden');
    if (ledgerContent) ledgerContent.classList.add('hidden');

    if (tab === 'gc') {
        // Show Gold Crowns tab
        if (gcTab) gcTab.className = activeTabStyle;
        if (gcContent) gcContent.classList.remove('hidden');
    } else if (tab === 'treasure') {
        // Show Treasure tab
        if (treasureTab) treasureTab.className = activeTabStyle;
        if (treasureContent) treasureContent.classList.remove('hidden');
    }
    // Note: Ledger tab is handled separately by switchToLedgerTab function
};

/** Setup battle view event handlers using event delegation */
export const setupBattleViewEvents = () => {
    document.addEventListener('click', (e) => {
        // Kill tracking buttons - check both button and icon inside
        const trackKillBtn = e.target.closest('.track-kill-btn');
        if (trackKillBtn) {
            const fighterId = trackKillBtn.dataset.fighterId;
            trackKill(fighterId);
        }
        
        const removeKillBtn = e.target.closest('.remove-kill-btn');
        if (removeKillBtn) {
            const fighterId = removeKillBtn.dataset.fighterId;
            removeKill(fighterId);
        }
        
        // Rabbit's Foot button - check both button and icon inside
        const rabbitFootBtn = e.target.closest('.rabbit-foot-btn');
        if (rabbitFootBtn) {
            const fighterId = rabbitFootBtn.dataset.fighterId;
            const fighterName = rabbitFootBtn.dataset.fighterName;
            useRabbitsFoot(fighterId, fighterName);
        }
        
        // Detail popup buttons - check both button and icon inside
        const equipmentBtn = e.target.closest('.show-equipment-btn');
        if (equipmentBtn) {
            const equipmentName = equipmentBtn.dataset.equipment;
            showBattleEquipmentDetails(equipmentName);
        }
        
        const skillsBtn = e.target.closest('.show-skills-btn');
        if (skillsBtn) {
            const skillName = skillsBtn.dataset.skills;
            const fighterId = skillsBtn.dataset.fighterId;
            showBattleSkillDetails(skillName, fighterId);
        }
        
        const spellsBtn = e.target.closest('.show-spells-btn');
        if (spellsBtn) {
            const spellName = spellsBtn.dataset.spell;
            showBattleSpellDetails(spellName);
        }

        const rulesBtn = e.target.closest('.show-rules-btn');
        if (rulesBtn) {
            const ruleName = rulesBtn.dataset.rule;
            showBattleAbilityDetails('rule', ruleName);
        }

        const injuriesBtn = e.target.closest('.show-injuries-btn');
        if (injuriesBtn) {
            const injuryName = injuriesBtn.dataset.injury;
            showBattleAbilityDetails('injury', injuryName);
        }
        
        // Fighter card toggle - check both header and icon inside
        const fighterCardToggle = e.target.closest('.fighter-card-toggle');
        if (fighterCardToggle) {
            const fighterId = fighterCardToggle.dataset.fighterId;
            toggleFighterCard(fighterId);
        }
    });
};

/** Setup skill selection event handlers using event delegation */
export const setupSkillSelectionEvents = () => {
    document.addEventListener('change', (e) => {
        // Trapper skill selection
        if (e.target.id === 'f-trapper-skill-choice') {
            handleTrapperSkillSelection(e);
        }
        
        // Packmaster Beast Handling skill selection
        if (e.target.id === 'f-packmaster-beast-handling-choice') {
            handlePackmasterBeastHandlingSelection(e);
        }
        
        // Hired Sword equipment selection
        if (e.target.id === 'f-hired-sword-equipment-choice') {
            handleHiredSwordEquipmentSelection(e);
        }
    });
};

/** Setup modal event handlers using event delegation */
export const setupModalEvents = () => {
    document.addEventListener('click', (e) => {
        // Casualty modal buttons
        if (e.target.id === 'casualty-yes-btn') {
            const modal = document.getElementById('casualty-modal');
            const fighterId = modal?.dataset.fighterId;
            if (fighterId) {
                applyCasualty(fighterId);
                modal.remove();
            }
        }
        
        if (e.target.id === 'casualty-no-btn') {
            const modal = document.getElementById('casualty-modal');
            modal.remove();
        }
        
        if (e.target.id === 'close-casualty-modal-btn') {
            const modal = document.getElementById('casualty-modal');
            modal.remove();
        }
        
        // Generic modal close buttons (for consistency)
        if (e.target.classList.contains('modal-close')) {
            const modal = e.target.closest('.modal');
            if (modal) modal.remove();
        }
    });
    
    document.addEventListener('change', (e) => {
        // Casualty radio button changes
        if (e.target.type === 'radio' && e.target.name && e.target.name.startsWith('casualty-')) {
            const fighterId = e.target.name.replace('casualty-', '');
            updateCasualtyResolution(fighterId, e.target.value);
        }
    });
};

// Toggle warband hamburger menu
export const toggleWarbandMenu = (warbandId) => {
    const menu = document.getElementById(`warband-menu-${warbandId}`);
    if (menu) {
        menu.classList.toggle('hidden');
    }
    
    // Close other menus
    document.querySelectorAll('.warband-dropdown-menu').forEach(otherMenu => {
        if (otherMenu.id !== `warband-menu-${warbandId}`) {
            otherMenu.classList.add('hidden');
        }
    });
};
