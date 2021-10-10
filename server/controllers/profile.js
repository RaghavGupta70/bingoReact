import Profile from '../models/profile.js';

export const getProfile = async (req, res) => {
    const email = req.params;
    console.log(email);
    try {
        const user = await Profile.findOne({ emailId: email.email });
        if (!user) return res.status(409).json('User not found');

        return res.status(201).json(user);
    } catch (error) {
        return res.status(404).json('Server Error Occured. Try Again');
    }
}

export const createProfile = async (req, res) => {
    const data = req.body;
    try {
        const user = new Profile(data);
        await user.save();
        return res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
        return res.status(404).json({ message: 'Profile not created' });
    }
}

export const getAllOpponentMatches = async (req, res) => {
    const email = req.params;
    var oppoMatches = [];
    try {
        const user = await Profile.findOne({ emailId: email.email });
        if (!user) return res.status(409).json('User not found');

        const allOpponents = user.opponentsData.map((oppo) => oppo.opponentEmail);

        for (var i = 0; i < allOpponents.length; i++) {
            const opponent = await Profile.findOne({ emailId: allOpponents[i] });
            if (opponent !== null)
                oppoMatches = [...oppoMatches, { oppoEmail: opponent.emailId, oppoM: opponent.matches }];
        }
        return res.status(200).json(oppoMatches);
    } catch (error) {
        console.log(error);
    }
}

export const getLeaderboardData = async (req, res) => {
    try {
        const allUsers = await Profile.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: 'Not able to get data from database.' });
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

export const updatePlayerData = async (req, res) => {
    try {
        const playerEmail = req.params.email;
        const { oppData, result } = req.body;

        const playerData = await Profile.find({ emailId: playerEmail });

        playerData.matchesPlayed++;

        if (result === 'Won') {
            playerData.matchesWon++;
        }

        else if (result === 'Lost') {
            playerData.matchesLost++;
        }

        playerData.rating += playerData.matchesWon / playerData.matchesPlayed;

        for (let i = 0; i < oppData.length; i++) {

            const playerOpp = playerData.opponentsData.find((opp) => opp.opponentEmail === oppData[i].email)

            if (playerOpp) {
                playerOpp.matchPlayed++;

                if (result === 'Won')
                    {playerOpp.matchWon++;
                    }
                        
                        else {
                            if(oppData[i].result === 'Won')
    playerOpp.matchLost++;
}

const playerOppData = playerData.opponentsData.map((opp)=> {
    opp.opponentEmail === playerOpp.opponentEmail?
})
            }

            else
            {
                const newOppLab = {
                    value: playerData.opponents[playerData.opponents.length - 1] + 1,
                    label: oppData[i].label
                };

                const newOppData = {
                    value: playerData.opponentsData[playerData.opponentsData.length-1]+1,
                    opponentEmail: oppData[i].email,
                    matchPlayed: 1,
                    matchWon: result==='Won'?1:0,
                    matchLost : result==='Lost'?oppData[i].result ==='Won'?1:0:0 
                }
                playerData.opponentsData.push(newOppData);
                playerData.opponents.push(newOppLab);
            }

        }

    }

    catch(error) {
        console.log(error);
    }
} 