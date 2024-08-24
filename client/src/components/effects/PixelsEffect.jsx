import { motion } from "framer-motion";

// (*) Horizontal Effect -->

const anim = {
  initial: {
    opacity: 0,
  },
  open: (delays) => ({
    opacity: 1,
    transition: {
      duration: 0,
      delay: 0.02 * delays[0],
    },
  }),
  closed: (delays) => ({
    opacity: 0,
    transition: {
      duration: 0,
      delay: 0.05 * delays[1],
    },
  }),
};

function PixelsEffect({ pixelView, setPixelView }) {
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  function getBlocks(indexOfTheColumn) {
    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.025;

    const amountOfBlocks = Math.ceil(innerHeight / blockSize);

    const delays = shuffle(Array.from({ length: amountOfBlocks }, (_, i) => i));

    return delays.map((randomDelay, i) => (
      <motion.div
        key={i}
        className="h-[2.5vw] w-full bg-gray-500"
        variants={anim}
        initial="initial"
        animate={pixelView ? "open" : "closed"}
        custom={[
          indexOfTheColumn + randomDelay,
          40 - indexOfTheColumn + randomDelay,
        ]}
        transition={{ duration: 5 }}
      ></motion.div>
    ));
  }

  return (
    <>
      {/* <button className="btn z-30" onClick={() => setPixelView(!pixelView)}>
        Action
      </button> */}
      <div className="flex h-[100vh] overflow-hidden absolute inset-0 z-20">
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="w-[2.5vw] h-full">
            {getBlocks(i)}
          </div>
        ))}
      </div>
    </>
  );
}

export default PixelsEffect;

// (*) Basic code for the Effect -->

// const anim = {
//     initial: {
//       opacity: 0,
//     },
//     open: (i) => ({
//       opacity: 1,
//       transition: {
//         duration: 0,
//         delay: 0.02 * i,
//       },
//     }),
//     closed: (i) => ({
//       opacity: 0,
//       transition: {
//         duration: 0,
//         delay: 0.02 * i,
//       },
//     }),
//   };

//   function PixelsEffect() {
//     const [menuIsActive, setMenuIsActive] = useState(false);

// *  // Fisher-Yates shuffle algorithm -> google it
// *  // Shuffles array in place

//     function shuffle(a) {
//       var j, x, i;
//       for (i = a.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = a[i];
//         a[i] = a[j];
//         a[j] = x;
//       }
//       return a;
//     }

//     function getBlocks() {
//       const { innerWidth, innerHeight } = window;
//       const blockSize = innerWidth * 0.05;

//       const amountOfBlocks = Math.ceil(innerHeight / blockSize);

//       // return [
//       //   ...Array(amountOfBlocks).map((_, i) => {
//       //     return <div key={i} className={styles.block}></div>;
//       //   }),
//       // ];

//       const delays = shuffle(Array.from({ length: amountOfBlocks }, (_, i) => i));

//       return delays.map((randomDelay, i) => (
//         <motion.div
//           key={i}
//           className={styles.block}
//           variants={anim}
//           initial="initial"
//           animate={menuIsActive ? "open" : "closed"}
//           custom={randomDelay}
//         ></motion.div>
//       ));
//     }

//     return (
//       <>
//         <button className="btn" onClick={() => setMenuIsActive(!menuIsActive)}>
//           Action
//         </button>
//         <div className={styles.pixelBackground}>
//           {/* {[...Array(20)].map((_, i) => {
//           return (
//               <div key={i} className={styles.column}>
//               {getBlocks()}
//               </div>
//               );
//               })} */}

//           {Array.from({ length: 20 }, (_, i) => (
//             <div key={i} className={styles.column}>
//               {getBlocks()}
//             </div>
//           ))}
//         </div>
//       </>
//     );
//   }

// Styles -->

// .pixelBackground {
//     display: flex;
//     height: 100vh;
//     overflow: hidden;
//     position: absolute;
//     inset: 0;
//     z-index: 20;

//     .column {
//       width: 2.5vw;
//       height: 100%;

//       .block {
//         height: 2.5vw;
//         width: 100%;
//         background-color: #...;
//       }
//     }
//   }
