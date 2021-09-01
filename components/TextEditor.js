import { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic"
import {EditorState} from "draft-js"
import { db } from "../firebase"
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/client'

import {convertFromRaw, convertToRaw} from 'draft-js'

import { useCollectionOnce } from 'react-firebase-hooks/firestore'


const Editor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor),
{
    ssr: false,
}
);


function TextEditor() {
    const [session] =useSession()
    const router = useRouter()
    const { id } = router.query
    const [editorState, seteditorState] = useState(EditorState.createEmpty())

    const [snapshot, loadingSnapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').doc(id))

    useEffect(() => {
    if (snapshot?.data()?.editorState) {
      seteditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

    const onEditorStateChange =(editorState) => {
        seteditorState(editorState);

        db.collection('userDocs').doc(session.user.email).collection('docs').doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true
        })
    }
    return (
        <div>
        <div className="bg-[#F8F9FA] min=h-screen pb-16">
            <Editor 
            editorState = {editorState}
            onEditorStateChange = {onEditorStateChange}
            toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
            editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mvb-12 border p-10" />
        </div>

            
        </div>
    )
}

export default TextEditor
