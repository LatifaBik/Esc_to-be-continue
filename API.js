
export async function getChallenges() {
  const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
  const data = await res.json();
  return data.challenges;
}

// function to create challenges cards
function createChallengeli(ch) {
  const {
    title,
    description,
    image,
    maxParticipants,
    minParticipants,
    rating = 0,
   labels = [],
    type,
  } = ch;

  const full = Math.floor(Number(rating));
  const empty = 5 - full;
  const filledStars = '★'.repeat(full).trim();
  const emptyStars = '☆'.repeat(empty);
  const typeText = type === 'onsite' ? '(on-site)' : '(networked)';

  const li = document.createElement('li');
  li.className = "challenge__listItem";

  li.innerHTML = `
 <article class="challenge">
       <img src="${image}" alt="${title}" class ="challenge__image">
       
        <div class="challenge__details">
          <div class="challenge__rating" role="img" aria-label="${rating} of 5 stars">
          <span class="challenge__rating__filledstar">${filledStars}</span>
            <span class="challenge__rating__emptystar">${emptyStars}</span>
              </div>
               <h3 class="challenge__title">${title} (${typeText})</h3>
                <span class="challenge__size">${minParticipants} - ${maxParticipants} participants</span>
              
                </div>
               
                <p class="challenge__description">${description}</p>
                <!--Checks if there are any labels in the labels array. Yes= show tags. No= no output -->
      ${labels.length ? `<div class="challenge__labels">${labels.map(l => `<span class="tags">#${l}</span>`).join(' ')}</div>` : ''}
            <div class="challenge__buttonWrapper">
                <button class="challenge__bookbutton">
             ${type==='onsite'? 'Book this room' : 'Take challenge online'}
             </button> 
             </div>               
 </article>
  `;
  return li;
}
// Function to download challenges to front site
const listElMain = document.querySelector('#main-list');
const statusElMain = document.querySelector('#main-status');

export async function initMain() {
  try {
    statusElMain.textContent = 'Loading challenges...';
    const all = await getChallenges();
    const top3 = [...all].sort ((a,b) => (b.rating ?? 0) -(a.rating ??0)).slice(0,3);
    listElMain.innerHTML = "";
    top3.forEach(ch => listElMain.appendChild(createChallengeli(ch))); 
    statusElMain.textContent = "";
  } catch (e) {
  
     statusElMain.textContent = 'Could not load data.';
        console.error(e);
  }
}


// Function to download challenges to next page
const listElAll = document.querySelector('#all-list');
const statusElAll = document.querySelector('#all-status');

export async function initAll(){
  try {
    statusElAll.textContent = 'Loading challenges..';
    const all = await getChallenges();
    const sorted = [...all].sort ((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0,15);

    listElAll.innerHTML = "";
    sorted.forEach(ch => listElAll.appendChild(createChallengeli(ch)));
    statusElAll.textContent = "";
  } catch (e){ 
    statusElAll.textContent = 'Could not load data..';

    console.error(e);

  }
  }
if (listElMain && statusElMain){
  initMain();
}
if (listElAll && statusElAll) {
 initAll();
}
