import { CardContainer, CardBody, CardItem } from "@components/Card3D.tsx";

export default function HomePageCards() {
  return (
    <CardContainer className="inter-var" reducer={10}>
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ={100}
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air!!!
        </CardItem>
        <CardItem
          translateZ={75}
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          as="p"
        >
          Demo of Floating 3D Cards.
        </CardItem>
        <CardItem
          translateZ={50}
          as="button"
          className="w-full mt-4"
          params={{onClick: () => alert("hi")}}
        >
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            as="button"
            translateZ={100}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            params={{onClick: () => alert("Nope You Can't... Yet")}}
          >
            Try Now →
          </CardItem>
          <CardItem
            translateZ={100}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            params={{onClick: () => alert("Sign Up to What?")}}
          >
            Sign Up Today!
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
)
}
