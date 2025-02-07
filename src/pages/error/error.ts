import Handlebars from "handlebars";

import * as Modules from './modules'

Object.entries(Modules).forEach(([name, template]) => {
    Handlebars.registerPartial(name, template);
})
