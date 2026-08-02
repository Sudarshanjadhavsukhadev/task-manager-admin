import "./ProjectCarousel.css";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel(){

    return(

        <div className="project-carousel">

            <div className="carousel-header">

                <h2>My Projects</h2>

                <button>See All</button>

            </div>

            <div className="project-scroll">

                <ProjectCard
                    title="Website Redesign"
                    progress={72}
                    tasks={12}
                    due="28 Jul"
                />

                <ProjectCard
                    title="Mobile App"
                    progress={90}
                    tasks={8}
                    due="12 Aug"
                />

                <ProjectCard
                    title="CRM System"
                    progress={46}
                    tasks={25}
                    due="5 Sep"
                />

            </div>

        </div>

    )

}