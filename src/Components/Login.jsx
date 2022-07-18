import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import VKMain from './ranks/vk/Main'
import GFMain from './ranks/gf/Main'
import ZFMain from './ranks/zf/Main'
import DCMain from './ranks/dc/Main'
import VKLMain from './ranks/vkl/Main'
import VMain from './ranks/v/Main'
import FMain from './ranks/f/Main'

function Login() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(false);
    const [uid, setUid] = useState("");
    const [rank, setRank] = useState("");
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const loginAuth = () => {
        setUsername(usernameRef.current.value);
        setPassword(passwordRef.current.value);
        const email = username + "@vkaw.ch";
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUid(userCredential.user.uid);
                const q = query(collection(db, "users"), where("uid", "==", userCredential.user.uid));
                getDocs(q)
                    .then((data) => {
                        data.docs.map((doc) => {
                            setRank(doc.data().rank);
                        })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        console.log("Error: " + errorCode);
                        const errorMessage = error.message;
                        console.log("Because: " + errorMessage);
                    })
                setValidation(true)
            })
            .catch((error) => {
                setValidation(false);
                const errorCode = error.code;
                console.log("Error: " + errorCode);
                const errorMessage = error.message;
                console.log("Because: " + errorMessage);
            });
    }

    if (validation === true) {
        switch (rank) {
            case "vk":
                return (
                    <VKMain username={username} uid={uid} />
                )
            case "gf":
                return (
                    <GFMain username={username} uid={uid} />
                )

            case "zf":
                return (
                    <ZFMain username={username} uid={uid} />
                )
            case "dc":
                return (
                    <DCMain username={username} uid={uid} />
                )
            case "vkl":
                return (
                    <VKLMain username={username} uid={uid} />
                )
            case "v":
                return (
                    <VMain username={username} uid={uid} />
                )
            case "f":
                return (
                    <FMain username={username} uid={uid} />
                )
            default:
                break;
        }
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen dark:bg-black">
                <p className="text-orange-500 font-extrabold text-5xl mb-16">VKAW</p>
                <input ref={usernameRef} type="text" placeholder="Benutzername" className="input-container" />
                <input ref={passwordRef} type="password" placeholder="Passwort" className="input-container" />
                <button className="bg-orange-500 px-16 py-1 my-5 rounded-md text-white dark:text-black font-bold" onClick={loginAuth}>Login</button>
            </div>
        )
    }
}

export default Login;