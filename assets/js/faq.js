// faq.js

const faqsData = [
    // Getting Started
    { q: 'How do I get started with Gro?', a: 'After downloading and installing Gro, go through the Setup Guide on the Money tab. You\'ll be guided step by step to set up your accounts, customize categories, and learn the basic features. The process takes about 5-10 minutes.' },
    { q: 'How do I add my bank accounts?', a: 'Tap the account selector in the Money tab or go to the Accounts area. Choose "Add Account", select the account type (checking, savings, etc.), and enter a name and starting balance. You can also customize the color and icon to make it easily recognizable.' },
    { q: 'How do I add a credit card?', a: 'Similar to bank accounts, go to the Accounts area, tap "Add Account", and select "Credit Card". Enter the card name, starting balance (if any), and customize it with a color and icon. Gro will help you track your credit card spending and payments.' },

    // Daily Usage
    { q: 'How do I add transactions?', a: 'Use the Floating Action Button (FAB) in the Money tab - swipe left for expenses, right for income, or tap for more options. For regular bills or income, set up recurring transactions through the grid menu to save time.' },
    { q: 'How can I organize my spending?', a: 'Gro uses categories to organize transactions. Find pre-set categories in the grid menu, or create your own with custom names, colors, and icons. You can also set budgets for expense categories and income targets to stay on track.' },
    { q: 'How do I transfer money between accounts?', a: 'To transfer funds, tap the FAB in the Money tab, select "Transfer", choose the source and destination accounts, enter the amount, and add a note if needed. Gro will automatically update both account balances.' },
    { q: 'How do I view my financial insights?', a: 'The Money tab provides quick insights like net savings, expenses by category, income sources, and transfer history. For deeper analysis, go to the Analytics section for detailed reports and trends.' },
    { q: 'How do I set up budgets?', a: 'In the Plans section, go to "Budget & Targets". Here you can set monthly or yearly budgets for expense categories and income targets. Gro will notify you if you exceed your budgets.' },
    { q: 'How do I manage my bills?', a: 'For regular bills, set up repeat transactions in the grid menu. You can also categorize them under a specific expense category for better tracking. Gro will automatically create transactions on specified dates. ' },
    { q: 'How do I handle cash transactions?', a: 'For cash transactions, create a "Cash" account in the Accounts section. Add cash expenses or income just like any other transaction, and Gro will keep your cash balance updated.' },
    { q: 'What if I forget to record transactions?', a: 'No problem! You can add transactions for any date. Use the account reconciliation feature to match your recorded balance with your actual bank balance, and Gro will help identify missing transactions.' },

    // Features & Capabilities
    { q: 'How to track my net worth?', a: 'Go to Plans > Assets & Debts to see your complete financial picture. Add your assets (property, vehicles, investments) and track their values. Combined with the Debts & Liabilities section, you\'ll see your current net worth and its growth over time.' },
    { q: 'Can I import my existing transactions?', a: 'Yes! Access the Import feature from the grid menu. You can import transactions from CSV files - perfect for bringing in history from other apps or bank exports. Check our guide for the correct CSV format.' },
    { q: 'What reports and insights are available?', a: 'The Analytics section offers various insights: expense breakdowns by category, income source analysis, savings rate trends, and cash flow reports. You can view data weekly, monthly, or yearly, and compare periods to track your progress.' },

    // Planning & Goals
    { q: 'Can I track my investments?', a: 'Yes! Add investments as assets in the Plans section and update their values periodically. For now, you\'ll need to manually update investment values as they change. Automatic investment tracking is planned for a future update.' },
    { q: 'How do I set financial goals?', a: 'In the Plans section, you can set financial goals like saving for a vacation or paying off debt. Use the Budget & Targets feature to create specific savings targets and track your progress over time.' },
    { q: 'Can I track my savings progress?', a: 'Absolutely! The Plans section allows you to set savings goals and track your progress. You can create specific savings targets, like building an emergency fund or saving for a major purchase, and monitor how close you are to achieving them.' },
    { q: 'How do I manage my debts?', a: 'In the Plans section, go to Debts & Liabilities. Here you can add loans, credit cards, or any other debts. Track balances, payment schedules, and view detailed amortization schedules to manage your repayments effectively.' },
    { q: 'How do I categorize my transactions?', a: 'When adding or editing a transaction, you can assign it to a category. Gro comes with pre-set categories, but you can also create custom ones in the Categories section. This helps you track spending and income sources effectively.' },
    { q: 'How do I manage my cash flow?', a: 'The Money tab provides a quick overview of your cash flow, showing net savings (Income - Expenses) for the selected period. For detailed cash flow reports, go to the Analytics section.' },

    // FIRE Planning
    { q: 'What is FIRE planning?', a: 'FIRE (Financial Independence, Retire Early) is a financial strategy to save and invest aggressively so you can retire earlier than traditional retirement age. Gro\'s FIRE calculator helps you plan this journey by calculating how much you need to save and how long it will take.' },
    { q: 'How do I use the FIRE calculator?', a: 'Go to Plans > FIRE Planning, then enter three key numbers: your current savings, expected annual investment returns (typically 6-8%), and desired retirement income. Gro will calculate your FIRE number (total savings needed) and show a timeline to reach it.' },
    { q: 'What is the 4% rule in FIRE planning?', a: 'The 4% rule suggests you can withdraw 4% of your retirement savings annually without running out of money. For example, if you need $40,000/year in retirement, you\'d need to save $1 million (your FIRE number). Gro uses this rule to help calculate your savings target.' },
    { q: 'How can I track my FIRE progress?', a: 'The FIRE Planning section shows your progress toward your FIRE number through an interactive timeline. As you update your savings and investments in Gro, you\'ll see your projected retirement date adjust automatically. You can also adjust your retirement income goals anytime to see how they affect your timeline.' },

    // Investment & Passive Income tracking
    { q: 'How do I track my investments?', a: 'Currently, Gro allows you to add investments as assets in the Plans section. You can manually update their values over time. We plan to introduce automatic investment tracking in a future update.' },
    { q: 'Can I track passive income?', a: 'Yes! You can categorize income sources as "Passive" in the Income section. This helps you see how much of your income comes from passive sources like dividends, interest, or rental income.' },

    // Analytics & Reports
    { q: 'What kind of analytics does Gro provide?', a: 'Gro offers detailed analytics on your finances, including income and expense breakdowns by category, savings trends, net worth tracking, and cash flow reports. You can view data weekly, monthly, or yearly to identify patterns and make informed decisions.' },
    { q: 'Can I compare different time periods?', a: 'Yes! In the Analytics section, you can compare financial data across different periods (e.g., this month vs. last month) to see how your spending and income change over time.' },
    { q: 'Can I track my spending habits?', a: 'Yes! The Analytics section provides insights into your spending habits, including expense breakdowns by category, trends over time, and comparisons against budgets. You can also see how much you spend on needs vs. wants.' },
    { q: 'How do I view my income sources?', a: 'In the Money tab, you can see your income sources by category. The Analytics section also provides detailed insights into your income trends, including active vs. passive income sources.' },
    { q: 'Can I set financial targets?', a: 'Yes! In the Plans section, you can set income targets and expense budgets. Gro will notify you if you exceed your budgets or fall short of your income targets, helping you stay on track.' },

    // Settings & Preferences
    { q: 'Can I use Gro in my language and currency?', a: 'Yes! During setup or in Settings, choose your preferred language and set your primary currency. All transactions and calculations will use this currency for consistency.' },
    { q: 'How do I change the app\'s theme?', a: 'Gro supports both light and dark themes. You can switch between them in Settings > Appearance. The app will remember your choice for future sessions.' },
    { q: 'Can I customize the app\'s categories?', a: 'Absolutely! Go to the Categories section in the grid menu to create, edit, or delete categories. You can customize names, colors, and icons to fit your financial needs.' },
    { q: 'Does Gro work offline?', a: 'Yes, Gro works completely offline. All your data is stored locally on your device, so you can manage your finances anywhere, anytime, without needing an internet connection.' },
    { q: 'How do I customize the app\'s appearance?', a: 'Gro offers both light and dark themes - switch between them in Settings. You can also customize account colors, category icons, and other visual elements to make the app truly yours.' },

    // Data & Security
    { q: 'How secure is my financial data?', a: 'Very secure! Gro uses bank-grade encryption for all data, supports fingerprint/face authentication, and offers PIN/pattern locks. Your data is encrypted both on your device and in your Google Drive backups.' },
    { q: 'How do I back up my data?', a: 'Gro automatically backs up your encrypted data to your Google Drive. You can also manually trigger a backup from Settings > Backup & Restore. Your data is protected with your account password and device authentication.' },
    { q: 'How do I restore my data from a backup?', a: 'To restore your data, go to Settings > Backup & Restore and select "Restore from Google Drive". Make sure you have an existing backup available. The app will prompt you to confirm the restoration process.' },
    { q: 'Can I delete my data?', a: 'Yes, you can delete all your data from Settings > Data & Security. This will remove all accounts, transactions, and settings from the app. Use this option with caution, as it cannot be undone.' },
    { q: 'How do I reset Gro to start fresh?', a: 'If you want to reset Gro, go to Settings > Data Management and select "Delete and Start Fresh". This will remove all your data and settings, allowing you to set up the app as if it were new. Use this option with caution.' },

    // Future Plans
    { q: 'Is there a way to collaborate with family?', a: 'Currently, Gro is designed for individual use with data stored locally on your device. We\'re actively working on a family sharing feature that will allow secure data sharing between family members. Stay tuned for this update!' },
    { q: 'Can I track business expenses separately?', a: 'While you can currently use categories to organize different types of expenses, dedicated business expense tracking is coming in a future update. This will include features like receipt scanning, tax category tagging, and business-specific reports. For now, we recommend using categories and tags to separate personal and business transactions.' },

    // Tips & Tricks
    { q: 'How can I make the most of the budgeting features?', a: 'Start with realistic category budgets based on your past spending (visible in Analytics). Use the "Need vs Want" tags for better insights, set up budget notifications, and regularly review your progress in the Analytics section. The app can help identify areas where you\'re consistently over or under budget.' },
    { q: 'What are some tips for effective financial planning with Gro?', a: 'Regularly review your financial health in the Analytics section. Set clear financial goals (like saving for a vacation or paying off debt) and use the Plans section to track progress. Automate savings by setting up recurring transfers to your savings account. Finally, keep your categories organized and up-to-date for accurate tracking.' }
];

function renderLimitedFAQs(containerSelector, itemsToShow, viewAllButtonConfig) {
    const faqsContainer = document.querySelector(containerSelector);
    if (!faqsContainer) return;

    faqsContainer.innerHTML = ''; // Clear existing

    faqsData.slice(0, itemsToShow).forEach(faq => {
        const faqItemContainer = document.createElement('div');
        faqItemContainer.className = 'p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 faq-item-container';
        faqItemContainer.style.backgroundColor = 'var(--color-secondary-bg)';
        faqItemContainer.innerHTML = `
            <details class="group faq-group">
                <summary class="flex justify-between items-center font-semibold text-lg cursor-pointer faq-summary list-none" style="color: var(--color-text-primary);">
                    ${faq.q}
                </summary>
                <p class="mt-4" style="color: var(--color-text-secondary);">${faq.a}</p>
            </details>
        `;
        faqsContainer.appendChild(faqItemContainer);
    });

    if (viewAllButtonConfig && faqsData.length > itemsToShow) {
        let showMoreBtn = document.getElementById(viewAllButtonConfig.id);
        if (!showMoreBtn) {
            showMoreBtn = document.createElement('a');
            showMoreBtn.id = viewAllButtonConfig.id;
            showMoreBtn.className = viewAllButtonConfig.className || 'faq-show-more-button';
            showMoreBtn.textContent = viewAllButtonConfig.text || 'View All FAQs';
            
            const currentTheme = document.documentElement.getAttribute('data-theme') || 
                                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            
            const url = new URL(viewAllButtonConfig.url, window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1));
            if (viewAllButtonConfig.from) {
                url.searchParams.set('from', viewAllButtonConfig.from);
            }
            url.searchParams.set('theme', currentTheme);
            showMoreBtn.href = url.toString();

            const parentOfFaqsContainer = faqsContainer.parentNode;
            if (parentOfFaqsContainer) {
                 parentOfFaqsContainer.insertBefore(showMoreBtn, faqsContainer.nextSibling);
            }
        }
    }
}

function renderAllFAQs(containerSelector) {
    const faqsContainer = document.querySelector(containerSelector);
    if (!faqsContainer || !faqsData || faqsData.length === 0) return;

    faqsContainer.innerHTML = ''; // Clear existing

    faqsData.forEach(faq => {
        const faqItemDiv = document.createElement('div');
        faqItemDiv.classList.add('faq-item');

        const questionElement = document.createElement('h3');
        questionElement.textContent = faq.q;
        questionElement.classList.add('faq-question');

        const answerElement = document.createElement('p');
        answerElement.textContent = faq.a;
        answerElement.classList.add('faq-answer');

        faqItemDiv.appendChild(questionElement);
        faqItemDiv.appendChild(answerElement);
        faqsContainer.appendChild(faqItemDiv);
    });
}

function initializeFAQSearch(searchInputId, faqsContainerSelector, faqItemSelector, questionSelector, answerSelector) {
    const searchInput = document.getElementById(searchInputId);
    const faqsContainer = document.querySelector(faqsContainerSelector);

    if (!searchInput || !faqsContainer) return;

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const faqItems = faqsContainer.querySelectorAll(faqItemSelector);

        faqItems.forEach(item => {
            const questionText = item.querySelector(questionSelector)?.textContent.toLowerCase() || "";
            const answerText = item.querySelector(answerSelector)?.textContent.toLowerCase() || "";

            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}