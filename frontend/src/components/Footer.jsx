import { InstagramIcon, LinkedinIcon } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="footer footer-center p-4 bg-base-100 text-base-content">
            <div>
                <p className="text-2xl font-bold text-primary">
                    ProductStore
                </p>
                {/* <p className="text-sm text-gray-500">
                    Your one-stop shop for all things products
                </p> */}
            </div>
            <div>
            <p className="text-sm">
                © {new Date().getFullYear()} ProductStore. All rights reserved.
            </p>
            {/* <p className="text-xs">
                Built with ❤️ using React and Tailwind CSS
            </p> */}
            </div>
            <div className='flex items-center justify-center space-x-2'>
                
                <p className="text-xs">
                    Made by <a href="https://github.com/Fathima-Sulthana" className="text-primary hover:underline">Fathima Sulthana</a>
                </p>
                <button>
                    <a href="https://www.linkedin.com/in/fathimasulthanah/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        <LinkedinIcon className="inline size-5 mr-1" />    
                    </a>
                    <a href="https://www.instagram.com/fathima_naiha_/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        <InstagramIcon className="inline size-5 ml-1" />
                    </a>
                </button>
                
            </div>
        </footer>
    </div>
  )
}

export default Footer
