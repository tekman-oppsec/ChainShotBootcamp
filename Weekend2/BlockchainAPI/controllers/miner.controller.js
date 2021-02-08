var miners = {
    miner1: {
        id: 1,
        firstname: "Alfonso",
        lastname: "Powers",
        publickey: "04ff39b5e44303c25cfc24f3a3982bfea30589c30fee35f65f66e99254858a47f63bad6d5ad7ebbfae3d9c5066fd4ac73c2062111babad9b05b19cb8e66cd42925",
        privatekey: "d35f66388f685b0bb4e12603b3181c640bf3dc68ed6174f7f2b7af32aa1aeeee"
    }
}

// POST (create) a miner
exports.create = function(req, res) {
    let newMiner = req.body;

    // TODO: Validate the keys are valid

    // Add to the miners
    console.log(newMiner.id + "\n" + newMiner.publickey + "\n" + newMiner.privatekey);
    miners["miner" + newMiner.id] = newMiner;

    console.log("######## Get Miners ########\n" + JSON.stringify(miners));
    res.end("Miner Successfully Added: \n" + JSON.stringify(newMiner));
}

// GET all miners
exports.getAll = function(req, res) {
    console.log("######## Get Miners ########\n" + JSON.stringify(miners));
    res.end("All Miners: \n" + JSON.stringify(miners));
}

// GET a miner
exports.getOne = function(req, res) {
    let miner = miners["miner" + req.params.id];

    console.log("######## Get a Miner ########\n" + JSON.stringify(miner));
    res.end("Find a Miner:\n" + JSON.stringify(miner));
}

// PUT (update) a miner
exports.update = function(req, res) {
    let id = parseInt(req.params.id);
    let updatedMiner = req.body; 
    if(miners["miner" + id] != null){
      // update data
      miners["miner" + id] = updatedMiner;
   
      console.log("######## Miner Updated Successfully, Miners: ########\n: \n" + JSON.stringify(miners))
      
      // return
      res.end("Miner Updated Successfully! \n" + JSON.stringify(updatedMiner));
    }else{
      res.end("Miner Does not Exist!:\n:" + JSON.stringify(updatedMiner));
    }
}