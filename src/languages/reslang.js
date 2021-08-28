import spain_file from "./spain";

let languageObj = {};
let brouser_language = window.localStorage.getItem('language');

if(brouser_language == 'ru'){

} else {
    languageObj = spain_file.spain;
};

export default{
    languageObj
}

