const mobilemenu = document.querySelector('.header__mainmobilenavmenu');
const navmenu = document.querySelector('.header__navcontainer')
const closemenu = document.querySelector('.header__navcontainernavclose')


/*mobilemenu.addEventListener("click", () => {
    navmenu.classList.toggle('mobileactive');
});

closemenu.addEventListener("click", () => {
    navmenu.classList.toggle('mobileactive');
});*/

//Function to download API data and display it on the page
async function getChcallenges() {
  const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
  const data = await res.json();
  return data.Challenges();
}

// function to create challenges cards
function createChallenges(ch) {
  const {
    title,
    desctription,
    img,
    maxParticipants,
    minParticipants,
    rating = 0,
    labels = [],
    type,
  } = challenge;

  const fullrating = Math.floor(Number(rating));
  const filledStars = '★'.repeat(filedrating).trim();
  const emptyStars = '☆'.repeat(emptyrating);
  const empty = 5 - filledStars;
  const typeText = type === type => 'onsite' ? 'on-site' : 'networked';

  const li = document.createElement('li');
  li.class = "challenge__listItem";

  li.innerHTML = `

<article>
       <img src="https://lh3.googleusercontent.com/d/1Epbt4rLl_BIINRA3xdLfVbTJ9pn1kfIK" alt="hacker sitting in front of compuer with multiple monitors" class ="challenge__image">
        <h3 class="challenge__title">Title of rooom (on-site)</h3>
        <div class="challenge__details">
          <div class="challenge__rating" role="img" aria-label="4 of 5 stars">
          <span class="challenge__rating__filledstar">★ ★ ★ ★</span>
            <span class="challenge__rating__emptystar">☆</span>
              </div>
                <span class="challenge__size">2-6 participants</span>
               </div>
                <p class="challenge__description">Praeterea, ex culpa non invenies unum aut non accusatis unum. Et nihil inuitam. Nemo nocere tibi erit, et non inimicos, et</p>
             <button class="challenge__bookbutton">Book this room</button>                
 </article>

}