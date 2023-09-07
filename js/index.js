const loadcategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    // console.log(data.data);

    const category_container = document.getElementById('category_container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.classList.add('nav');
        div.innerHTML = `
                    <a onclick="HandleLoadVedio(${category.category_id})" class="tab text-black text-md font-medium" data-category-id="${category.category_id}">${category.category}</a>
                `;

        category_container.appendChild(div);
    });
}

const HandleLoadVedio = async (categoryvedio) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryvedio}`)
    const data = await response.json();

    const vedio_container = document.getElementById('vedio_container');
    vedio_container.innerHTML = '';
    no_vedio.innerHTML = '';
    const blog = document.getElementById('blog_container');
    blog.innerHTML = '';

    // Remove the "active-tab" class from all tabs
    const tabs = document.querySelectorAll('.nav a');
    tabs.forEach((tab) => {
        tab.classList.remove('active-tab');
    });

    if (data.data.length > 0) {
        data.data.forEach((vediocard) => {



            const hours = Math.floor((vediocard.others.posted_date) / 3600);
            const minutes = Math.floor(((vediocard.others.posted_date) % 3600) / 60);
            // console.log(vediocard.others.posted_date)

            // 

            let result = hours + "hours " + minutes + "minutes ago";
            // console.log()
            const div = document.createElement('div');
            div.innerHTML = `.
            <div class="card h-76 bg-base-100 shadow-xl p-4 relative">
            <img class="w-78 h-40" src="${vediocard.thumbnail}" />
            
            <p class="absolute bottom-40 right-4  bg-black-500 text-white font-semibold text-xl">${vediocard.others.posted_date ? result : ''}</p> <!-- Add absolute and positioning classes to the <p> tag -->
            
            <div class="card-body">
                <div class="card-actions justify-between">
                    <div class="flex">
                        <div><img class="w-14 h-14 rounded-full" src=${vediocard.authors[0].profile_picture} />
                        </div>
                        <div>
                            <h2 class="text-lg font-medium">${vediocard.title.slice(0, 15)}</h2>
                            <div class="flex">
                                <h2 class="">${vediocard.authors[0].profile_name}</h2>
                                <img src="${vediocard.authors[0].verified ? 'Group 3.png' : ''}" />
                            </div>
                            <h2 class="">${vediocard.others.views}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `;




            vedio_container.appendChild(div);
        });



    } else {
        const no_vedio = document.getElementById('no_vedio');
        no_vedio.innerHTML = `
                    <div class="flex justify-center align-middle">
                        <img class="pt-10 text-center" src="./Icon.png" alt="Shoes"  />
                    </div>
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl">Oops!! Sorry, There is no content here</h2>
                    </div>
                `;
    }



    // const hourMinElement = document.getElementById('hourMin');
    // hourMinElement.innerText = secondsToHoursAndMinutes(${ vediocard.others.posted_date });



    // function secondsToHoursAndMinutes(seconds) {
    //     const hours = Math.floor(seconds / 3600);
    //     const minutes = Math.floor((seconds % 3600) / 60);
    //     return `${hours} hours ${minutes} minutes ago`;
    // }




    // Add the "active-tab" class to the clicked tab
    const clickedTab = document.querySelector(`[data-category-id="${categoryvedio}"]`);
    clickedTab.classList.add('active-tab');
}




////




//blog
document.getElementById('blog_btn').addEventListener('click', function () {
    vedio_container.innerHTML = '';
    no_vedio.innerHTML = '';

    const blog = document.getElementById('blog_container');

    blog.innerHTML = `
                  
1.Discuss the scope of var, let, and const <br>

var:<br>

Function Scope: <br>Variables declared with var have 
function scope, meaning they are only accessible within the function in which they are
 declared. If declared outside of a function, they have global scope.

Re-declaration: Variables declared with var can be re-declared within the same scope without causing an error.
<br>
let:<br>
Block Scope:<br> Variables declared with let have block scope, which means they are only accessible within the block (e.g., inside a loop, if statement, or function) in which they are declared.<br>

No Re-declaration:<br> You cannot re-declare a variable with let in the same scope.<br>

const:<br>

Block Scope:<br> Like let, variables declared with const have block scope.<br>
Hoisting: <br>const variables are also hoisted but, similar to let, trying to access a const variable before its declaration will result in a ReferenceError.<br>
No Re-assignment: Variables declared with const cannot be reassigned after their initial value is assigned. However, they are not necessarily 
<br><br><br><br>
2.Tell us the use cases of null and undefined <br>

    null and undefined are both special values in JavaScript used to represent missing or empty values:<br>

    null:<br>

    Explicitly assigned to indicate the absence of any object value.
    Used when you want to signify that a variable should have no value or that a property intentionally has no meaningful value.
    It's a deliberate assignment to denote the absence of a value.<br>
    undefined:<br>

    Represents a variable that has been declared but not yet assigned a value.
    Automatically assigned to uninitialized variables or function parameters.
    Can also indicate the absence of a return value in a function or an undefined property in an object.<br>
    <br><br><br>
    3.What do you mean by REST API <br>

    A REST API (Representational State Transfer Application Programming Interface) is a set of rules and conventions for designing web services that use HTTP methods (GET, POST, PUT, DELETE) to access and manipulate resources, making it a widely used approach for building web-based applications and services.<br>



`

})




loadcategory();
HandleLoadVedio('1001')
