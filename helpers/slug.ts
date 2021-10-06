const slugify = require('slugify');

const generateSlug = (name):string =>{
    return slugify(name);
}

export const slugHelper ={
    generateSlug
}
