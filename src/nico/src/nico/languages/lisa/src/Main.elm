port module Main exposing (main)

import Dict
import Json.Encode as E
import Keys exposing (keyMacro)
import Lisa


type Msg
    = Request String


update : Msg -> () -> ( (), Cmd Msg )
update msg () =
    case msg of
        Request s ->
            ( ()
            , out <|
                Lisa.parseProgramToJson s { macros = Dict.fromList [ ( "key", keyMacro ) ] }
            )


main : Program E.Value () Msg
main =
    Platform.worker
        { init = \_ -> ( (), Cmd.none )
        , update = update
        , subscriptions = \_ -> incoming Request
        }


port incoming : (String -> msg) -> Sub msg


port out : E.Value -> Cmd msg
