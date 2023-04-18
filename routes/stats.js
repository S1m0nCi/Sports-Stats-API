const express = require('express');
const fs = require('fs');
const path = require('path');

const router =  express.Router();

// GET request - note the absence of an await.

const getStats = async (req, res, next) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, './stats.json'));
        const stats = JSON.parse(data);
        const playerStats = stats.find(player => player.id == Number(req.params.id));
        if (!playerStats) {
            const err =  new Error('Player stats nor found');
            err.status = 404;
            throw err;
        }
        res.json(playerStats);
    } catch (error) {
        next(error)
    }
};

router
    .route('api/v1/stats/:id')
    .get(getStats);

module.exports = router;

const createStats = async (req, res, next) => {
    try {
        const data = fs.readFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const newStats = {
            id: req.body.id,
            win: req.body.wins,
            losses: req.body.losses,
            points_scored: req.body.points_scored
        };
        stats.push(newStats);
        fs.writeFileSync(statsFilePath, JSON.stringify(stats));
        res.status(201).json(newStats);
    } catch (error) {
        next(error);
    }
};

router
    .route('api/v1/stats')
    .post(createStats);

// PUT request

const updateStats = async (req, res, next) => {
    try {
        const data = fs.readFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const playerStats = stats.find(player => player.id === Number(req.params.id))
        if (!playerStats) {
            const err = new Error('Player stats not found')
            err.status = 404
            throw err
        }
        const newStatsData = {
            id: req.body.id,
            wins: req.body.wins,
            losses: req.bod.losses,
            points_scored: req.body.points_scored
        };
        const newStats = stats.map(player => {
            if (player.id === Number(req.params.id)) {
                return newStatsData
            } else {
                return player
            }
        });
        fs.writeFileSync(statsFilePath, JSON.stringify(newStats));
        res.status(200).json(newStatsData) 
    } catch (error) {
        next(error)
    }
};


