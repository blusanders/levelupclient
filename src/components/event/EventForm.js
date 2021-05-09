import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = () => {
    const history = useHistory()

    const { games, getGames } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    useEffect(() => {
        getGames()
    }, [])

    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: "",
        organizerId: 0
    })

    const handleInputChange = (event) => {
        const newEvent = { ...currentEvent }
        newEvent[event.target.name] = event.target.value
        setCurrentEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" required className="form-control"
                        value={currentEvent.gameId}
                        onChange={handleInputChange}
                    >
                        <option value="0">Select a Game</option>
                        {
                            games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)
                        }
                    </select>
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input required type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event =
                    {   
                        description:currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gameId: parseInt(currentEvent.gameId),
                        // organizer: parseInt(currentEvent.gamer),
                        // attendees:[]
                    }
                    // Create the event
                    createEvent(event)
                        .then(() => history.push("/events"))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>

        </form>
    )
}