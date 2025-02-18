// Enhanced name database
const maleNames = [
    { name: 'Aarav', meaning: 'Peaceful, Wisdom', lucky: 1, rashi: 'Mesh (Aries)', element: 'Fire' },
    { name: 'Dev', meaning: 'Divine, God-like', lucky: 3, rashi: 'Vrishabh (Taurus)', element: 'Earth' },
    { name: 'Krishna', meaning: 'Dark One, All-Attractive', lucky: 5, rashi: 'Kark (Cancer)', element: 'Water' },
    { name: 'Arjun', meaning: 'White, Clear, Bright', lucky: 7, rashi: 'Dhanu (Sagittarius)', element: 'Fire' },
    { name: 'Vivaan', meaning: 'Full of Life, Self-luminous', lucky: 9, rashi: 'Kumbh (Aquarius)', element: 'Air' },
    { name: 'Aditya', meaning: 'Sun, Unbound', lucky: 2, rashi: 'Sinh (Leo)', element: 'Fire' },
    { name: 'Reyansh', meaning: 'Ray of Light', lucky: 4, rashi: 'Meen (Pisces)', element: 'Water' },
    { name: 'Vihaan', meaning: 'Dawn of a New Day', lucky: 6, rashi: 'Tula (Libra)', element: 'Air' },
    { name: 'Kabir', meaning: 'The Great', lucky: 8, rashi: 'Makar (Capricorn)', element: 'Earth' },
    { name: 'Ishaan', meaning: 'Sun God', lucky: 1, rashi: 'Mesh (Aries)', element: 'Fire' }
];

const femaleNames = [
    { name: 'Aanya', meaning: 'Limitless, Grace', lucky: 2, rashi: 'Vrishabh (Taurus)', element: 'Earth' },
    { name: 'Diya', meaning: 'Light, Lamp', lucky: 4, rashi: 'Kark (Cancer)', element: 'Water' },
    { name: 'Saanvi', meaning: 'Goddess Lakshmi', lucky: 6, rashi: 'Tula (Libra)', element: 'Air' },
    { name: 'Advika', meaning: 'Unique, One of a kind', lucky: 8, rashi: 'Dhanu (Sagittarius)', element: 'Fire' },
    { name: 'Myra', meaning: 'Wonderful, Peaceful', lucky: 1, rashi: 'Meen (Pisces)', element: 'Water' },
    { name: 'Aaradhya', meaning: 'One who is worthy of worship', lucky: 3, rashi: 'Mesh (Aries)', element: 'Fire' },
    { name: 'Avani', meaning: 'Earth', lucky: 5, rashi: 'Kumbh (Aquarius)', element: 'Air' },
    { name: 'Kiara', meaning: 'God\'s Precious Gift', lucky: 7, rashi: 'Sinh (Leo)', element: 'Fire' },
    { name: 'Zara', meaning: 'Blooming Flower', lucky: 9, rashi: 'Makar (Capricorn)', element: 'Earth' },
    { name: 'Ishani', meaning: 'Goddess Durga', lucky: 2, rashi: 'Vrishchik (Scorpio)', element: 'Water' }
];

// Calculate Nakshatra number based on birth details
function calculateNakshatraNumber(date, time) {
    const dateStr = date + time;
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash) % 27 + 1;
}

// Generate multiple names based on birth details
function generateNames(nakshatra, gender) {
    const namesList = gender === 'male' ? maleNames : femaleNames;
    const numNames = 5; // Number of suggestions to show
    const suggestions = [];
    
    // Get starting index based on nakshatra
    let startIndex = nakshatra % namesList.length;
    
    // Get multiple suggestions
    for (let i = 0; i < numNames; i++) {
        const index = (startIndex + i) % namesList.length;
        suggestions.push(namesList[index]);
    }
    
    return suggestions;
}

// Create HTML for a single name card
function createNameCard(nameData, index) {
    return `
        <div class="bg-purple-50 rounded-lg p-4 name-card transform hover:scale-102 transition-transform duration-200">
            <div class="flex justify-between items-start">
                <h3 class="text-xl font-bold text-purple-900">${nameData.name}</h3>
                <span class="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded-full">#${index + 1}</span>
            </div>
            <div class="mt-2 space-y-1">
                <p class="text-gray-600"><span class="font-medium">Meaning:</span> ${nameData.meaning}</p>
                <p class="text-purple-600"><span class="font-medium">Lucky Number:</span> ${nameData.lucky}</p>
                <p class="text-gray-600"><span class="font-medium">Rashi:</span> ${nameData.rashi}</p>
                <p class="text-gray-600"><span class="font-medium">Element:</span> ${nameData.element}</p>
            </div>
        </div>
    `;
}

// Form submission handler
document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dob = document.getElementById('dob').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const gender = document.getElementById('gender').value;

    // Calculate nakshatra and get name suggestions
    const nakshatra = calculateNakshatraNumber(dob, time);
    const suggestions = generateNames(nakshatra, gender);

    // Display results
    const resultsContainer = document.getElementById('nameResults');
    resultsContainer.innerHTML = suggestions
        .map((name, index) => createNameCard(name, index))
        .join('');
    
    document.getElementById('result').classList.remove('hidden');
});

// Form validation
const form = document.getElementById('nameForm');
const inputs = form.querySelectorAll('input, select');

inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() === '') {
            this.classList.add('border-red-500');
        } else {
            this.classList.remove('border-red-500');
        }
    });
});