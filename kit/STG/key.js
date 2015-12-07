

var Key = {



    Update: function(){


        for(var key in Input){

            this[key] = this[key] || 0;


            this[key] = Input[key] ? this[key] + 1 : 0;

        }

    }


};
