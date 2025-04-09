import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Heads from "../../assets/head";
import * as Faces from "../../assets/face";
import * as FacialHairs from "../../assets/facial-hair";
import * as Bodies from "../../assets/body";
import * as Sitting from "../../assets/sitting";
import * as Standing from "../../assets/standing";
import * as Accessories from "../../assets/accessory";
import "./App.scss";

function App() {
  const [character, setCharacter] = useState<Character>({
    head: 43,
    face: 24,
    "facial hair": -1,
    body: -1,
    standing: -1,
    sitting: 9,
    accessory: 1,
  });
  const [locked, setLocked] = useState<string[]>([]);

  const Head = Object.values(Heads)[character["head"]];
  const Face = Object.values(Faces)[character["face"]];
  const FacialHair = Object.values(FacialHairs)[character["facial hair"]];
  const Body = Object.values(Bodies)[character["body"]];
  const Stand = Object.values(Standing)[character["standing"]];
  const Sit = Object.values(Sitting)[character["sitting"]];
  const Accessory = Object.values(Accessories)[character["accessory"]];

  const categories: Category[] = [
    {
      key: "head",
      name: "Head",
      assets: Object.values(Heads),
      required: true,
    },
    {
      key: "face",
      name: "Face",
      assets: Object.values(Faces),
      required: true,
    },
    {
      key: "facial hair",
      name: "Facial hair",
      assets: Object.values(FacialHairs),
      required: false,
    },
    {
      key: "body",
      name: "Body",
      assets: Object.values(Bodies),
      required: false,
    },
    {
      key: "standing",
      name: "Pose - standing",
      assets: Object.values(Standing),
      required: false,
    },
    {
      key: "sitting",
      name: "Pose - sitting",
      assets: Object.values(Sitting),
      required: false,
    },
    {
      key: "accessory",
      name: "Accessories",
      assets: Object.values(Accessories),
      required: false,
    },
  ];

  function changeOption(category: Category, index: number) {
    const { required, key } = category;

    const newCharacter: Character = {
      ...character,
    };

    if (!required && character[key] === index) {
      if (key === "body") {
        newCharacter["standing"] = 0;
      }
      if (key === "sitting") {
        newCharacter["body"] = 0;
      }
      if (key === "standing") {
        newCharacter["body"] = 0;
      }

      newCharacter[key] = -1;

      return setCharacter(newCharacter);
    }

    if (key === "body") {
      newCharacter["sitting"] = -1;
      newCharacter["standing"] = -1;
    }
    if (key === "sitting") {
      newCharacter["body"] = -1;
      newCharacter["standing"] = -1;
    }
    if (key === "standing") {
      newCharacter["body"] = -1;
      newCharacter["sitting"] = -1;
    }

    newCharacter[key] = index;

    setCharacter(newCharacter);
  }

  function randomize() {
    const newCharacter: Character = { ...character };

    if (!locked.includes("head")) {
      newCharacter.head = Math.floor(
        Math.random() * Object.values(Heads).length
      );
    }
    if (!locked.includes("face")) {
      newCharacter.face = Math.floor(
        Math.random() * Object.values(Faces).length
      );
    }
    if (!locked.includes("facial hair")) {
      newCharacter["facial hair"] =
        Math.random() > 0.5
          ? Math.floor(Math.random() * Object.values(FacialHairs).length)
          : -1;
    }
    if (!locked.includes("accessory")) {
      newCharacter.accessory =
        Math.random() > 0.5
          ? Math.floor(Math.random() * Object.values(Accessories).length)
          : -1;
    }

    if (
      !locked.includes("body") &&
      !locked.includes("standing") &&
      !locked.includes("sitting")
    ) {
      const randomPose = Math.floor(Math.random() * 3);
      if (randomPose === 0) {
        newCharacter.body = Math.floor(
          Math.random() * Object.values(Bodies).length
        );
        newCharacter.standing = -1;
        newCharacter.sitting = -1;
      } else if (randomPose === 1) {
        newCharacter.standing = Math.floor(
          Math.random() * Object.values(Standing).length
        );
        newCharacter.body = -1;
        newCharacter.sitting = -1;
      } else {
        newCharacter.sitting = Math.floor(
          Math.random() * Object.values(Sitting).length
        );
        newCharacter.body = -1;
        newCharacter.standing = -1;
      }
    }

    setCharacter(newCharacter);
  }

  function randomizeOption(category: Category) {
    const newCharacter: Character = { ...character };

    const randomIndex = Math.floor(
      Math.random() * Object.values(category.assets).length
    );

    newCharacter[category.key] = randomIndex;

    setCharacter(newCharacter);
  }

  function lockOption(category: Category) {
    if (locked.includes(category.key)) {
      setLocked(locked.filter((key) => key !== category.key));
    } else {
      setLocked([...locked, category.key]);
    }
  }

  function unlockAllOptions() {
    setLocked([]);
  }

  return (
    <main>
      <header className="header">
        <h1 className="header__title">Character creator</h1>
        <div className="header__actions">
          <button
            onClick={randomize}
            disabled={locked.length === categories.length}
          >
            randomize
          </button>
          <button onClick={unlockAllOptions} disabled={locked.length === 0}>
            unlock all
          </button>
        </div>
      </header>

      <div className="layout">
        <div className="character-icon">
          {Head && (
            <div className="head">
              <Head />
            </div>
          )}
          {Face && (
            <div className="face">
              <Face />
            </div>
          )}
          {FacialHair && (
            <div className="facial-hair">
              <FacialHair />
            </div>
          )}
          {Accessory && (
            <div className="accessory">
              <Accessory />
            </div>
          )}
          {Body && (
            <div className="body">
              <Body />
            </div>
          )}
          {Sit && (
            <div className="sitting">
              <Sit />
            </div>
          )}
          {Stand && (
            <div className="standing">
              <Stand />
            </div>
          )}
        </div>

        <div className="categories">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="category__header">
                <h2 className="category">
                  {category.name}{" "}
                  <span className="category__count">
                    (
                    {character[category.key] >= 0
                      ? character[category.key] + 1
                      : "-"}
                    /{Object.values(category.assets).length})
                  </span>
                </h2>
                <div className="category__actions">
                  <button
                    onClick={() => randomizeOption(category)}
                    disabled={locked.includes(category.key)}
                  >
                    randomize
                  </button>
                  <button onClick={() => lockOption(category)}>
                    {locked.includes(category.key) ? "unlock" : "lock"}
                  </button>
                </div>
              </div>
              <div className="options">
                <AnimatePresence mode="sync">
                  {Object.values(category.assets).map((Option, index) => {
                    const originalIndex = Object.values(
                      category.assets
                    ).indexOf(Option);

                    return (
                      <motion.button
                        key={originalIndex}
                        initial={{
                          position: "relative",
                          opacity: 0,
                          left: "-100px",
                          top: "-200px",
                        }}
                        animate={{
                          opacity: 1,
                          left: 0,
                          top: 0,
                        }}
                        exit={{
                          opacity: 0,
                          left: "-100px",
                          top: "200px",
                        }}
                        transition={{
                          delay: index * 0.04,
                          duration: 0.01,
                          type: "spring",
                          bounce: 0.05,
                          stiffness: 130,
                        }}
                        className={`option ${
                          character[category.key] === index ? "selected" : ""
                        }`}
                        onClick={() => changeOption(category, index)}
                      >
                        <div className="option-asset">
                          <Option key={index} />
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
