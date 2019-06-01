module Keys exposing (getClosestKeys, keyMacro, keyMappings, keyNameToCode)

import Dict exposing (Dict)
import Lisa.Common
    exposing
        ( Error
        , LocatedNode
        , errNode
        , mapNode
        , nonRecovErrNode
        , nonRecovError
        )
import Lisa.Parser exposing (SExpr(..))
import Lisa.Process exposing (Expr(..), MacroHandler)
import StringDistance
import Tuple


keyMappings : Dict String Int
keyMappings =
    Dict.fromList listKeyMappings


listKeyMappings : List ( String, Int )
listKeyMappings =
    [ ( "cancel", 3 )
    , ( "help", 6 )
    , ( "backSpace", 8 )
    , ( "tab", 9 )
    , ( "clear", 12 )
    , ( "return", 13 )
    , ( "enter", 14 )
    , ( "shift", 16 )
    , ( "control", 17 )
    , ( "alt", 18 )
    , ( "pause", 19 )
    , ( "capsLock", 20 )
    , ( "escape", 27 )
    , ( "space", 32 )
    , ( "pageUp", 33 )
    , ( "pageDown", 34 )
    , ( "end", 35 )
    , ( "home", 36 )
    , ( "left", 37 )
    , ( "up", 38 )
    , ( "right", 39 )
    , ( "down", 40 )
    , ( "printscreen", 44 )
    , ( "insert", 45 )
    , ( "delete", 46 )
    , ( "n0", 48 )
    , ( "n1", 49 )
    , ( "n2", 50 )
    , ( "n3", 51 )
    , ( "n4", 52 )
    , ( "n5", 53 )
    , ( "n6", 54 )
    , ( "n7", 55 )
    , ( "n8", 56 )
    , ( "n9", 57 )
    , ( "semicolon", 59 )
    , ( "equals", 61 )
    , ( "a", 65 )
    , ( "b", 66 )
    , ( "c", 67 )
    , ( "d", 68 )
    , ( "e", 69 )
    , ( "f", 70 )
    , ( "g", 71 )
    , ( "h", 72 )
    , ( "i", 73 )
    , ( "j", 74 )
    , ( "k", 75 )
    , ( "l", 76 )
    , ( "m", 77 )
    , ( "n", 78 )
    , ( "o", 79 )
    , ( "p", 80 )
    , ( "q", 81 )
    , ( "r", 82 )
    , ( "s", 83 )
    , ( "t", 84 )
    , ( "u", 85 )
    , ( "v", 86 )
    , ( "w", 87 )
    , ( "x", 88 )
    , ( "y", 89 )
    , ( "z", 90 )
    , ( "leftCmd", 91 )
    , ( "rightCmd", 93 )
    , ( "contextMenu", 93 )
    , ( "numpad0", 96 )
    , ( "numpad1", 97 )
    , ( "numpad2", 98 )
    , ( "numpad3", 99 )
    , ( "numpad4", 100 )
    , ( "numpad5", 101 )
    , ( "numpad6", 102 )
    , ( "numpad7", 103 )
    , ( "numpad8", 104 )
    , ( "numpad9", 105 )
    , ( "multiply", 106 )
    , ( "add", 107 )
    , ( "separator", 108 )
    , ( "subtract", 109 )
    , ( "decimal", 110 )
    , ( "divide", 111 )
    , ( "f1", 112 )
    , ( "f2", 113 )
    , ( "f3", 114 )
    , ( "f4", 115 )
    , ( "f5", 116 )
    , ( "f6", 117 )
    , ( "f7", 118 )
    , ( "f8", 119 )
    , ( "f9", 120 )
    , ( "f10", 121 )
    , ( "f11", 122 )
    , ( "f12", 123 )
    , ( "f13", 124 )
    , ( "f14", 125 )
    , ( "f15", 126 )
    , ( "f16", 127 )
    , ( "f17", 128 )
    , ( "f18", 129 )
    , ( "f19", 130 )
    , ( "f20", 131 )
    , ( "f21", 132 )
    , ( "f22", 133 )
    , ( "f23", 134 )
    , ( "f24", 135 )
    , ( "numLock", 144 )
    , ( "scrollLock", 145 )
    , ( "comma", 188 )
    , ( "period", 190 )
    , ( "slash", 191 )
    , ( "backQuote", 192 )
    , ( "openBracket", 219 )
    , ( "backSlash", 220 )
    , ( "closeBracket", 221 )
    , ( "quote", 222 )
    , ( "meta", 224 )
    ]


getClosestKeys : Int -> String -> List String
getClosestKeys n name =
    listKeyMappings
        |> List.map (\( key, _ ) -> ( key, StringDistance.sift3Distance name key ))
        |> List.sortBy Tuple.second
        |> List.take n
        |> List.map Tuple.first


keyNameToCode : String -> Maybe Int
keyNameToCode name =
    Dict.get name keyMappings


errorMessage : String -> String
errorMessage keyname =
    "You have an invalid key name: '"
        ++ keyname
        ++ "'. Did you mean: "
        ++ (keyname
                |> getClosestKeys 2
                |> List.map (\k -> "'" ++ k ++ "'")
                |> List.intersperse " or "
                |> List.foldr (++) ""
           )
        ++ "?"


keyMacro : MacroHandler
keyMacro processExpr loc args =
    case args of
        keyNode :: [] ->
            case keyNode.node of
                Symbol sym ->
                    case keyNameToCode sym of
                        Just code ->
                            Ok <| LocatedNode loc <| NumLit <| toFloat code

                        Nothing ->
                            Err <| nonRecovErrNode keyNode <| errorMessage sym

                _ ->
                    Err <| nonRecovError loc "Operand to 'key' must be a symbol"

        _ ->
            Err <| nonRecovError loc "Expected exactly one operand to 'key'"
