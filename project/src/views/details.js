import { deleteById, getPetById } from '../api/data.js';
import { html } from '../libra.js';
import { getUserData } from '../utilies.js';



const detailsTemplate = (pet,isOwner,Deletebabe,userData) => html` 
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age} </h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>

                    ${ userData ? html`
                    <div class="actionBtn">
                        ${isOwner ? html`
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a  @click=${Deletebabe} href="#" class="remove">Delete</a>
                        `:null}
                        <!-- Only for registered user and creator of the pets-->
                       
                        
                        <!--(Bonus Part) Only for no creator and user-->
                        ${isOwner ? null
                        :html`
                        <a href="#" class="donate">Donate</a>
                        `
                        }
                        
                    </div>
                    `:null}
                    
                </div>
            </div>
        </section>
`;


export async function detailsPage(ctx) {
    const petId=ctx.params.id
    const pet = await getPetById(petId)
   
    const userData=getUserData();
    const isOwner=userData && pet._ownerId==userData.id;

    
        ctx.render(detailsTemplate(pet,isOwner,Deletebabe,userData));


        

      
             async function Deletebabe(){
            if(isOwner){

                const choise =confirm('are you sure mate???');
            if(choise){
            await deleteById(petId);
            ctx.page.redirect('/');
        }
    }
}
              
            

        
       
               
                

}