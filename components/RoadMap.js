import Head from "next/head";
import Link from "next/link";


const RoadMap = () => {
    return (
        <div id="roadmap" className="min-h-screen bg-yellow-400">
           <div className="flex flex-col items-center justify-center">
           <div className="md:py-36 py-20">
                    <h1
                        role="heading"
                        className="xl:text-6xl md:text-4xl text-xl font-bold leading-10 text-indigo-700"
                    >
                        The RoadMap
                    </h1>
                </div>
           </div>
        <div className="min-h-screen flex justify-center">
            <div className="w-2/3 mx-auto">
                <div className="flex flex-row w-full">
        {/* <!-- left col --> */}
    
        <div className="w-2/5 px-2 py-10">
            <div className="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                <div className="text-gray-600 mb-2 flex justify-between">
                    <div className="font-bold text-indigo-700">
                        Svjatoslav Torn
                    </div>
                    <div className="flex flex-row">
                        <button className="text-blue-500 mr-2 hover:text-blue-300 transition duration-200"><i className="far fa-edit"></i></button>
                        <button className="text-red-500 hover:text-red-300 transition duration-200"><i className="far fa-trash-alt"></i></button>
                    </div>
                </div>
                <div className="text-indigo-700">
                    Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa deserunt, dignissimos dolor esse fugit ipsam minus odit officiis placeat qui, quidem quis soluta vero? Adipisci alias eius et iure nam nihil reiciendis saepe, voluptatem. Alias cumque dicta dignissimos ea et laborum, minima similique.
                </div>
            </div>
    
        </div>
        {/* <!--line column--> */}
        <div className="w-1/5  flex justify-center">
            <div className="relative flex h-full w-1 bg-black items-center justify-center">
                <div className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-black leading-none text-center z-10 bg-white font-thin">
                    <div>20</div>
                    <div>September</div>
                </div>
            </div>
        </div>
        {/* <!--right column--> */}
        <div className="w-2/5 px-2 py-10 ">
    
        </div>
    </div>
                <div className="flex flex-row w-full">
        {/* <!-- left col --> */}
    
        <div className="w-2/5 px-2 py-10">
    
        </div>
        {/* <!--line column--> */}
        <div className="w-1/5  flex justify-center">
            <div className="relative flex h-full w-1 bg-black items-center justify-center">
                <div className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-black leading-none text-center z-10 bg-white font-thin">
                    <div>20</div>
                    <div>сентября</div>
                </div>
            </div>
        </div>
        {/* <!--right column--> */}
        <div className="w-2/5 px-2 py-10 ">
            <div className="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                <div className="text-indigo-700 mb-2 flex justify-between">
                    <div className="font-bold">
                        Svetlana Torn
                    </div>
                </div>
                <div className="text-indigo-700">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis enim esse fuga modi quisquam veritatis?
                    Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa deserunt, dignissimos dolor esse fugit ipsam minus odit officiis placeat qui, quidem quis soluta vero? Adipisci alias eius et iure nam nihil reiciendis saepe, voluptatem. Alias cumque dicta dignissimos ea et laborum, minima similique.
                </div>
            </div>
        </div>
    </div>
                <div className="flex flex-row w-full">
        {/* <!-- left col --> */}
    
        <div className="w-2/5 px-2 py-10">
            <div className="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                <div className="text-gray-600 mb-2 flex justify-between">
                    <div className="font-bold text-indigo-700">
                        Svjatoslav Torn
                    </div>
                    <div className="flex flex-row">
                        <button className="text-blue-500 mr-2 hover:text-blue-300 transition duration-200"><i className="far fa-edit"></i></button>
                        <button className="text-red-500 hover:text-red-300 transition duration-200"><i className="far fa-trash-alt"></i></button>
                    </div>
                </div>
                <div className="text-indigo-700">
                    Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa deserunt, dignissimos dolor esse fugit ipsam minus odit officiis placeat qui, quidem quis soluta vero? Adipisci alias eius et iure nam nihil reiciendis saepe, voluptatem. Alias cumque dicta dignissimos ea et laborum, minima similique.
                </div>
            </div>
    
        </div>
        {/* <!--line column--> */}
        <div className="w-1/5  flex justify-center">
            <div className="relative flex h-full w-1 bg-black items-center justify-center">
                <div className="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-black leading-none text-center z-10 bg-white font-thin">
                    <div>20</div>
                    <div>сентября</div>
                </div>
            </div>
        </div>
        {/* <!--right column--> */}
        <div className="w-2/5 px-2 py-10 ">
    
        </div>
    </div>
            </div>
    
    
        </div>
    
            </div>
        
    )
}

export default RoadMap;