import Profile from '../models/profile.js';

export const getProfile = async(req,res) => {
    const email = req.params;
    console.log(email);
    try {
        const user = await Profile.findOne({emailId: email.email});
        if(!user) return res.status(409).json('User not found');

        return res.status(201).json(user);
    } catch (error) {
        return res.status(404).json('Server Error Occured. Try Again');
    }
}

export const createProfile = async(req,res) => {
    const data = req.body;
    try {
        const user = new Profile(data);
        await user.save();
        return res.status(201).json({message:'Profile created successfully'});
    } catch (error) {
        return res.status(404).json({message:'Profile not created'});
    }
}

export const getAllOpponentMatches = async(req,res) => {
    const email = req.params;
    var oppoMatches = [];
    try{
        const user = await Profile.findOne({emailId: email.email});
        if(!user) return res.status(409).json('User not found');

        const allOpponents = user.opponentsData.map((oppo)=> oppo.opponentEmail);

        for(var i=0;i<allOpponents.length;i++){
            const opponent = await Profile.findOne({emailId:allOpponents[i]});
            if(opponent !==null)
             oppoMatches = [...oppoMatches,{oppoEmail:opponent.emailId,oppoM:opponent.matches}];
        }
         return res.status(200).json(oppoMatches);
    } catch(error){
        console.log(error);
    }
}

// export const updateProfile = async(req,res) => {
//     const email = req.body;
//     try {
//         const user = await Profile.find(email);
//         if(!user) return res.status(409).json('User Not found');

//         await Profile.updateOne
//     } catch (error) {
        
//     }
// }