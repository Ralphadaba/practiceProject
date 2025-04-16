import { use, useActionState, useOptimistic } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext); //These functions gotten from context are asynchronous functions that yield promises so they should be awaited and wrapped with async

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) => //check below
    mode === 'up' ? prevVotes + 1 : prevVotes - 1
  );

  async function upvoteAction() {
    setVotesOptimistically('up'); //Use optimistic knows when to get rid of the optimistic state (when the action is complete).
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    setVotesOptimistically('down');
    await downvoteOpinion(id);
  }

  const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}   //You can do this for individual buttons in a form and even still accept the formData.
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button> 

        <span>{optimisticVotes}</span>  

        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}

/**
 * const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) => 
 * A little bit like useState. The first arguement is the state(optimisticVotes) which is managed and changed with the help of the following function
 * which is the second arguement. Of course, the update from the function will update the state.
 * 
 * The second element in the array returned by useOptimistic is a function that we can call to invoke the optimistic updating function (the second arg after votes). 
 * It's just like useState but the updating function. The function receives two args. First is passed by react automatically and second is passed as an arg to setVotesOp...
 * is passed as a second arguement to useOptimistic and it is used in conjunction with form actions.
 * Optimistic votes is a temporary state that is only shown on the UI whilst the form that invoked the optimistic update is still being submitted. After it's submitted, the state will be thrown away and the actual update will be implemented. 
 * sed to enhance user experience basically. 
 * 
 * 
 */