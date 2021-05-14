import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom';

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

        const history = useHistory();

    return (

        <>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
        history.push({ pathname: "/games/new" })
        }}
        >Register New Game
        </button>

        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div className="game__eventCount">Count {game.event_count}</div>
                        <div>
                            <button className="btn btn-1 btn-sep icon-create"
                            onClick={() => {
                            history.push({ pathname: "/games/edit/"+game.id })
                            }}
                            >EDIT
                            </button>
                        </div>
                        <div><hr></hr></div>
                    </section>
                })
            }
        </article>
        </>
    )
}