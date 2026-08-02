import "./ProjectCard.css";
import { FolderKanban } from "lucide-react";

interface Props{
    title:string;
    progress:number;
    tasks:number;
    due:string;
}

export default function ProjectCard({
    title,
    progress,
    tasks,
    due
}:Props){

    return(

        <div className="project-card">

            <div className="project-icon">
                <FolderKanban size={24}/>
            </div>

            <h3>{title}</h3>

            <div className="project-progress">

                <div className="progress-bg">

                    <div
                        className="progress-blue"
                        style={{width:`${progress}%`}}
                    />

                </div>

                <span>{progress}%</span>

            </div>

            <div className="project-footer">

                <span>{tasks} Tasks</span>

                <span>{due}</span>

            </div>

        </div>

    )

}