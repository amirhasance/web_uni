const get_gender_by_name = (name) => { /*وظیفه ریکوست به ای پی ای و تبدیل آن به ابجکت جی اس */
    var url = "https://api.genderize.io/?name="
    url = url + name
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    data = JSON.parse(xmlHttp.responseText)
    return data
}
const submit_event_handler = (e) => { /* ایونت هندلر مربوط به کلید سابمیت با توجه به لاجیک*/
    var name = document.getElementById("name_input").value
    for (var i = 0; i < name.length; i++) {
        var char_code = name.charCodeAt(i)
        var flag = false
        if (char_code == 32) {
            flag = true
        }
        if (char_code >= 65) {
            if (char_code <= 122) {
                flag = true
            }
        }
        if (flag == false) {
            document.getElementById("name_input").value = ""
        }
    }
    var data = get_gender_by_name(name)
    {
        document.getElementById("gender").innerText = data.gender
        document.getElementById("prediction").innerText = data.probability
        if (localStorage.getItem(name)){
            document.getElementById("saved_name").innerText = localStorage.getItem(name)
        }

    }
}
const save_event_handler = (e) => {
    /*ایونت هندلر مربوط به دکمه سیو با توجه به لاجیک*/
    var male_choosed = document.getElementById("male_option").checked
    var female_choosed = document.getElementById("female_option").checked
    var name = document.getElementById("name_input").value
    if (name != null) {
        if (localStorage.getItem(name) == null && !female_choosed && !male_choosed) {
            console.log("saving")
            var data = get_gender_by_name(name)
            localStorage.setItem(name, data.gender)
        } else if (male_choosed) {
            localStorage.setItem(name, "male")
        } else if (female_choosed) {
            localStorage.setItem(name, "female")
        }
    }

}
const clear_saved_answer = (e) => {
    /*ایونت هندلر مربوط به کلیک پاک*/
    var name = document.getElementById("name_input").value
    localStorage.removeItem(name)
    document.getElementById("saved_name").innerText = null
    document.getElementById("gender").innerText = null
    document.getElementById("prediction").innerText = null
}




