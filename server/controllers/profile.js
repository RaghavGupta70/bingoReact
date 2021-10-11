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

export const updatePlayerData = async (req, res) => {
    try {
        const playerEmail = req.params.email;
        const { oppData, result } = req.body;

        let playerData = await Profile.find({ emailId: playerEmail });
        playerData = playerData[0];

        const todayMonth = new Date().getMonth();

        playerData.matchesPlayed++;

        if (result === 'Won') {
            playerData.matchesWon++;
            const matchMon = playerData.matches.filter((mt)=> mt.matchMonth === todayMonth);
            playerData.matches = playerData.matches.filter((mt)=> mt.matchMonth !== todayMonth);
            if(matchMon.length>0){
                matchMon[0].matchWon++;
            }
            else{
                const newMatchMon = {matchMonth:todayMonth,matchWon:1,matchLost:0,matchNoResult:0};
                matchMon[0] = newMatchMon;
            }
            playerData.matches.push(matchMon[0]);
        }

        else if (result === 'Lost') {
            playerData.matchesLost++;
            const matchMon = playerData.matches.filter((mt)=> mt.matchMonth === todayMonth);
            playerData.matches = playerData.matches.filter((mt)=> mt.matchMonth !== todayMonth);
            if(matchMon.length>0){
                matchMon[0].matchLost++;
            }
            else{
                const newMatchMon = {matchMonth:todayMonth,matchWon:0,matchLost:1,matchNoResult:0};
                matchMon[0] = newMatchMon;
            }
            playerData.matches.push(matchMon[0]);
        }

        playerData.rating += (playerData.matchesWon / playerData.matchesPlayed);

        for (let i = 0; i < oppData.length; i++) {

            const playerOpp = playerData.opponentsData.filter((opp) => opp.opponentEmail === oppData[i].email);
            playerData.opponentsData = playerData.opponentsData.filter((opp) => opp.opponentEmail !== oppData[i].email);

            if (playerOpp.length > 0) {
                playerOpp[0].matchPlayed++;

                if (result === 'Won') {
                    playerOpp[0].matchWon++;
                }

                else {
                    if (oppData[i].result === 'Won')
                        playerOpp[0].matchLost++;
                }
                playerData.opponentsData.push(playerOpp[0]);
            }

            else {
                const newOppLab = {
                    value: playerData.opponents.length,
                    label: oppData[i].label
                };

                const newOppData = {
                    value: playerData.opponentsData.length,
                    opponentEmail: oppData[i].email,
                    matchPlayed: 1,
                    matchWon: result === 'Won' ? 1 : 0,
                    matchLost: result === 'Lost' ? oppData[i].result === 'Won' ? 1 : 0 : 0
                }
                playerData.opponentsData.push(newOppData);
                playerData.opponents.push(newOppLab);
            }
        }
        const updated = await Profile.findOneAndUpdate({emailId:playerEmail},{$set:playerData},{ new:true,upsert:true });
        return res.status(201).json(updated);
    }

    catch (error) {
        return res.status(404).json({message:'You fucked Up'});
    }
} 