// Quote Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quoteForm');
    const projectType = document.getElementById('projectType');
    const projectSize = document.getElementById('projectSize');
    const squareFootage = document.getElementById('squareFootage');
    const estimateDisplay = document.getElementById('estimateDisplay');
    const estimateAmount = document.getElementById('estimateAmount');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Calculate estimate based on selections
    function calculateEstimate() {
        const typeOption = projectType.options[projectType.selectedIndex];
        const sizeOption = projectSize.options[projectSize.selectedIndex];

        if (!typeOption || !sizeOption || !typeOption.value || !sizeOption.value) {
            estimateDisplay.style.display = 'none';
            return;
        }

        const baseRate = parseFloat(typeOption.getAttribute('data-rate')) || 0;
        const multiplier = parseFloat(sizeOption.getAttribute('data-multiplier')) || 1;
        
        let sqft = parseInt(squareFootage.value);
        
        if (!sqft || sqft <= 0) {
            if (sizeOption.value === 'small') sqft = 300;
            else if (sizeOption.value === 'medium') sqft = 1000;
            else if (sizeOption.value === 'large') sqft = 2000;
            else if (sizeOption.value === 'xlarge') sqft = 4000;
        }

        const estimate = baseRate * sqft * multiplier;
        
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        estimateAmount.textContent = formatter.format(estimate);
        estimateDisplay.style.display = 'block';
        
        estimateDisplay.style.animation = 'slideUp 0.5s ease-out';
    }

    projectType.addEventListener('change', calculateEstimate);
    projectSize.addEventListener('change', calculateEstimate);
    squareFootage.addEventListener('input', calculateEstimate);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const zipCode = document.getElementById('zipCode').value.trim();
        const description = document.getElementById('description').value.trim();

        if (!fullName || !email || !phone || !zipCode || !projectType.value || !projectSize.value || !description) {
            showError('Please fill in all required fields.');
            return;
        }

        if (!validateEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        if (!validatePhone(phone)) {
            showError('Please enter a valid phone number.');
            return;
        }

        const formData = {
            fullName,
            email,
            phone,
            zipCode,
            projectType: projectType.options[projectType.selectedIndex].text,
            projectSize: projectSize.options[projectSize.selectedIndex].text,
            squareFootage: squareFootage.value || 'Not specified',
            timeline: document.getElementById('timeline').value,
            budget: document.getElementById('budget').value,
            description,
            permits: document.getElementById('permits').checked,
            design: document.getElementById('design').checked,
            financing: document.getElementById('financing').checked,
            estimate: estimateAmount.textContent
        };

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                showError(result.error || 'Failed to submit quote request. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    function showError(message) {
        document.getElementById('errorText').textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
});
