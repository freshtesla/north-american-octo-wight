/*---------------------
	:: Home 
	-> controller
---------------------*/




var HomeController = {

index: function (req, res) {
         var repod = "https://github.com/freshvolk/north-american-octo-wight/";
         var pulls = [ {
name: "Nothing",
        number: 7,
        st: { cr: 0, qa: 0 }
         },
             {
name: "CR 0 QA 1",
      number: 8,
      st: { cr: 0, qa: 1 }
             },
             {
name: "CR 1 QA 1",
      number: 8,
      st: { cr: 1, qa: 1 }
             },
             {
name: "CR 2 QA 1",
      number: 8,
      st: { cr: 2, qa: 1 }
             },
             {
name: "CR 1 QA 0",
      number: 8,
      st: { cr: 1, qa: 0 }
             },
             {
name: "CR 2 QA 0",
      number: 8,
      st: { cr: 2, qa: 0 }
             },
             {
name: "CR 1 QA 0",
      number: 8,
      st: { cr: 1, qa: 0 }
             },
             {
name: "CR 1 QA 0",
      number: 8,
      st: { cr: 1, qa: 0 }
             }];
         res.view( { pull: pulls, repo : repod } );
       } 

};
module.exports = HomeController;
