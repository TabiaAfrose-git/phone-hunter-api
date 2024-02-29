const phoneContainer = document.getElementById('phone-container');
//data loda kor hoiche
const loadPhone = async (searchText='13',isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}

// protita phone dekhano hoiche
const displayPhones = (phones,isShowAll) =>{
    // clear phone card
    phoneContainer.textContent = '';
    console.log(phones.length);
    // show all button
    const showAllContainer = document.getElementById('show-all-container');
    console.log('is showAll: ',isShowAll);
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // display only 12 only when isShowAll is false
    if(!isShowAll){
        phones = phones.slice(0,12);
    }


    phones.forEach(phone =>{
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card bg-gray-100 shadow-xl p-4`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handelShowDeTail('${phone.slug}');
            modal.showModal()"  class="btn btn-primary text-white">Show Details</button>
          </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
    //hidden toggleSpinner
    toggleLoadingSpinner(false);
}
// show details
const handelShowDeTail = async(id) => {
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}
const showPhoneDetails = (phone) =>{
    console.log(phone);
    modal.showModal();
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="">
    `
}

// search kora hoiche
const handelSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);

}
// loging show
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{loadingSpinner.classList.add('hidden');}
}
const handelShowAll = (isShowAll) => {
    handelSearch(true);
}
loadPhone();
