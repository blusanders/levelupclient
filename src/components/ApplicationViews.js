import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm.js"
import { EventList } from "./event/EventList.js"
import { EventProvider } from "./event/EventProvider.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { Profile } from "./profile/profile.js"
import { ProfileProvider } from "./profile/ProfileProvider.js"

export const ApplicationViews = () => {

    return <>
    
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <EventProvider>
            <GameProvider>

                <Route exact path="/">
                    <GameList />
                </Route>

                <Route exact path="/games/new">
                    <GameForm />
                </Route>

                <Route exact path="/games/edit/:gameId(\d+)">
                    <GameForm />
                </Route>

                <Route exact path="/events">
                    <EventList />
                </Route>

                <Route exact path="/events/new">
                    <EventForm />
                </Route>

                <ProfileProvider>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </ProfileProvider>

            </GameProvider>
            </EventProvider>

        </main>
    </>
}