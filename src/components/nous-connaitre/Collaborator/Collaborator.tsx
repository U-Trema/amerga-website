import React from "react"
import {Collaborator} from "@/components/Collaborator/Collaborator"
import {openModalHandler} from "@/hooks/useModal/useModal"
import {OpenModalProps} from "@/components/nous-connaitre/types"


export const CollaboratorSlice = React.memo<OpenModalProps>(
  ({slice, openModal}) => (
    <Collaborator slice={slice} openModal={openModalHandler({slice, openModal})}/>
  )
)

CollaboratorSlice.displayName = 'CollaboratorSlice'
