let guests = []; // stores the guests' details

const guestListContainer = document.getElementById("guest-list");
const emptyPlaceHolder = `
<div class='w-full h-60 flex flex-col items-center justify-center'>
    <span class='font-semibold text-xl'>No guests yet</span>
    <span class='text-gray-500 p-2.5'>Add your first guest to get started</span>
</div>`

function showGuests() {
    if (guests.length === 0) {
        // display a placeholder to make use of space better
        guestListContainer.innerHTML = emptyPlaceHolder
    } else {
        // clear the previously rendered HTML
        guestListContainer.innerHTML = ""

        // cycle through all guests and render a list item for each of them
        guests.forEach(guest => {
            let listItem = document.createElement("div") // the list item container
            listItem.classList.add("p-7")
            listItem.classList.add("flex")
            listItem.classList.add("justify-between")
            listItem.classList.add("items-center")
            listItem.classList.add("border-b")
            listItem.classList.add("border-gray-300")

            // the template for the list item
            listItem.innerHTML = `
            <div class='flex flex-col gap-1'>
                <div class='flex gap-1'>
                    <span class='text-lg font-medium text-gray-500'>${guest.name}</span>
                    <div class='px-2 py-1 rounded-full text-xs font-medium ${
                        guest.rsvp === 'yes' ? 'bg-green-100 text-green-800' :
                        guest.rsvp === 'no' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-600'}'>
                        ${guest.rsvp === "yes" ? "Attending":
                        guest.rsvp === "no" ? 'Not attending': 
                        "Pending"}
                    </div>
                </div>
                <p className="text-gray-600 mt-1">${guest.email}</p>
            </div>
            <div class='flex gap-2'>
                <button title="Mark as attending" class="transition-colors
                ${
                    guest.rsvp === 'yes' 
                        ? 'bg-green-100'
                        : 'hover:bg-green-50'
                }
                 p-2 rounded-lg" onClick='updateRSVP(${guest.id}, "yes")'>
                    <svg class='fill-gray-300 transition-colors
                    ${
                      guest.rsvp === 'yes' 
                        ? 'fill-green-700' 
                        : 'hover:fill-green-600'
                    }
                    cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
                </button>
                <button title="Mark as declined" class="transition-colors
                ${
                    guest.rsvp === 'no' 
                        ? 'bg-red-100' 
                        : 'hover:bg-red-50'
                }
                p-2 rounded-lg" onClick='updateRSVP(${guest.id}, "no")' label='remove'>
                    <svg class='transition-colors 
                    ${
                      guest.rsvp === 'no' 
                        ? 'fill-red-700' 
                        : 'hover:fill-red-600 '
                    }
                    fill-gray-300 cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
                </button>
                <div class='w-px h-6 bg-gray-300 mx-2'></div>
                <button title="Clear RSVP status" class="p-2 rounded-lg" onClick='updateRSVP(${guest.id}, null)'>
                    <svg class='fill-gray-300 cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M680-600h160q17 0 28.5 11.5T880-560q0 17-11.5 28.5T840-520H680q-17 0-28.5-11.5T640-560q0-17 11.5-28.5T680-600ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-240v-32q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240Z"/></svg>
                </button>
                <button title="Delete Guest" class="p-2 rounded-lg" onClick='deleteGuest(${guest.id})'>
                    <svg class='fill-gray-300 cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm120-160q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280Z"/></svg>
                </button>
            </div>
            `
            guestListContainer.append(listItem)
        })
    }
}

function updateRSVP(guestId, status) {
    // Since reference to objects don't change, directly update the object using map
    guests.map(guest => {
        if (guest.id === guestId) {
            guest.rsvp = status
        }
    })

    showGuests() // update the displayed list
}

function deleteGuest(guestId) {
    // return a new filtered list without the guest we've removed and replace the previous list's value with the filtered
    guests = guests.filter(guest => guest.id !== guestId)

    showGuests()
}

// initial display of the placeholder
showGuests()

function addGuest(event) {
    event.preventDefault()
    if (guests.length <= 10) {
        guests.push({
            id: guests.length + 1,
            name: nameInput.value,
            email: emailInput.value,
            rsvp: null
        }) // add a new guest to the list

        // clear the input fields
        nameInput.value = ""
        emailInput.value = ""

        showGuests()
    } else {
        alert("You can only have 10 guests")
    }
}

const form = document.getElementById("guest-form")

const nameInput = form.elements["name-field"]
nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        emailInput.focus() // move cursor to the next input field
    }
})

const emailInput = form.elements["email-field"]
emailInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addGuest(event)
        emailInput.blur() // free the cursor from the inputs
    }
})

const submitButton = document.getElementById("submit-button")
submitButton.addEventListener("click", addGuest)