const URL = 'http://localhost:8081';
let entries = [];
let categories = [];

const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

const createEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));
    entry['category'] = { id: formData.get('categoryName') };

    fetch(`${URL}/entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
            entries.push(entry);
            indexEntries();
        });
    });
};

const createCategory = (e) => {
    e.preventDefault();
    const fromData= new FormData(e.target);
    const category = {};
    category['name'] = fromData.get('Category')

    fetch(`${URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    }).then((result) => {
        result.json().then((category) => {
            entries.push(category);
            indexCategories();
        });
    });
};

const deleteEntry = (id) => {
    fetch(`${URL}/entries/${id}`, {
        method: 'DELETE'
    }).then(indexEntries);
};

const deleteCategory = (id) => {
    fetch(`${URL}/categories/${id}`, {
        method: 'DELETE'
    }).then(indexCategories);
}

const indexEntries = () => {
    fetch(`${URL}/entries`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            entries = result;
            renderEntries();
            //console.log(entries);
        });
    });
    renderEntries();
};

const indexCategories = () => {
    fetch(`${URL}/categories`, {
        method: 'GET'
    }).then((resultCat) => {
        resultCat.json().then((resultCat) => {
            categories = resultCat;
            renderCategoriesDropdown();
            renderCategories();
            //console.log(categories);
        });
    });
    renderCategories();
    renderCategoriesDropdown();
};

const renderCategoriesDropdown = () => {
    const display = document.querySelector( '#category');
    display.innerHTML = '<option selected value="null">Keine</option>';
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.id;
        option.innerHTML = category.name;
        display.appendChild(option);
    })
}

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerHTML = text;
    return cell;
};

const renderEntries = () => {
    const display = document.querySelector('#entryDisplay');
    display.innerHTML = '';
    entries.forEach((entry) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(entry.id));
        row.appendChild(createCell(new Date(entry.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(entry.checkOut).toLocaleString()));
        if (entry.category == null){
            row.appendChild(createCell("Keine Kategorie"))
        } else {
            row.appendChild(createCell(entry.category.name));
        }
        row.appendChild(createCell('<button type="submit" onclick="deleteEntry('+entry.id+')">Delete</button>'));
        display.appendChild(row);
    });
};

const renderCategories = () => {
    const display = document.querySelector('#categoryDisplay');
    display.innerHTML = '';
    console.log(categories);
    categories.forEach((category) => {
       const row = document.createElement('tr');
       row.appendChild(createCell(category.id));
       row.appendChild(createCell(category.name));
       row.appendChild(createCell('<button type="submit" onclick="deleteCategory('+category.id+')">Delete</button>'));
       display.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#createEntryForm');
    createEntryForm.addEventListener('submit', createEntry);
    indexEntries();

});
document.addEventListener('DOMContentLoaded', function(){
    const createCategoryForm = document.querySelector('#createCategoryForm');
    createCategoryForm.addEventListener('submit', createCategory);
    indexEntries();
    indexCategories();
    renderCategoriesDropdown();
    renderCategories();
});