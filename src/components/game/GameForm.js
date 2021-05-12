import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)
    const {gameId} = useParams()
    const [isLoading, setIsLoading] = useState(true);

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes()
        .then(()=>{
            if(gameId){
                getGameById(gameId)
                .then(game => {
                    // debugger
                    setCurrentGame(
                        {
                            skillLevel: game.skill_level,
                            numberOfPlayers: game.number_of_players,
                            title: game.title,
                            maker: game.maker,
                            gameTypeId: game.game_type.id
                        }
                    )
                    setIsLoading(false)
                })
            }
        })
    }, [])
    

    const handleInputChange = (event) => {
        const newGame = { ...currentGame }
        newGame[event.target.name] = event.target.value
        setCurrentGame(newGame)
    }

    return (

        <form className="gameForm">
            <h2 className="gameForm__title">
            {gameId ? "Edit Game" : "Register New Game"}
                
            </h2>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" required className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={handleInputChange}
                    >
                        {
                            gameTypes.map(gt => <option key={gt.id} value={gt.id}>{gt.label}</option>)
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers"># of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    //I am not using this const
                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    {gameId ? 
                        updateGame(gameId, currentGame)
                        .then(() => history.push("/"))
                    : 
                        createGame(currentGame)
                        .then(() => history.push("/"))
                    }
                }}
                className="btn btn-primary">
                {gameId ? "Edit Game" : "Create Game"}
                </button>
        </form>
    )
}