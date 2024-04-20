import { Link } from 'react-router-dom'

function Nav() {
  return (
    <>
       <div className="hidden md:block">
            <div className="ml-10 flex justify-end absolute right-44 p-10 gap-20 top-0 space-x-4 ">             
            <Link to ="#"
                className="text-gray-300  hover:text-black px-3 py-2 rounded-md text-xl font-medium" >
                About Us
              </Link>
              <Link to="#"
                className="text-gray-300  hover:text-black px-3 py-2 rounded-md text-xl font-medium">
                Pricing
              </Link>
              <button className='text-xl rounded-full bg-pink-400 border-2 border-white shadow-xl transition-all duration-300 hover:shadow-xl text-white px-4 hover:bg-white hover:text-black'>
                <Link>Register</Link>
              </button>
            </div>
          </div>
    </>
  )
}

export default Nav
