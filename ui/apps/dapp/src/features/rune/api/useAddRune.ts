import {
	useAddRuneERC20Intention,
	useFinalizeBTCTransaction,
	useSignIntention,
} from "@midl/executor-react";
import { useWaitForTransaction } from "@midl/react";
import { usePublicClient } from "wagmi";

type UseAddRuneParams = {
	mutation?: NonNullable<
		Parameters<typeof useWaitForTransaction>[0]
	>["mutation"];
};

export const useAddRune = ({ mutation }: UseAddRuneParams) => {
	const { addRuneERC20Async, ...rest } = useAddRuneERC20Intention();
	const { finalizeBTCTransactionAsync } = useFinalizeBTCTransaction();
	const { signIntentionAsync } = useSignIntention();
	const publicClient = usePublicClient();
	const { waitForTransaction, ...restWait } = useWaitForTransaction({
		mutation,
	});

	const addRune = async (runeId: string) => {
		const intention = await addRuneERC20Async({
			runeId,
			reset: true,
		});

		const { tx } = await finalizeBTCTransactionAsync();

		const signedTransaction = await signIntentionAsync({
			intention,
			txId: tx.id,
		});

		await publicClient?.sendBTCTransactions({
			serializedTransactions: [signedTransaction],
			btcTransaction: tx.hex,
		});

		waitForTransaction({ txId: tx.id });
	};

	return {
		addRune,
		...rest,
		waitState: restWait,
	};
};
