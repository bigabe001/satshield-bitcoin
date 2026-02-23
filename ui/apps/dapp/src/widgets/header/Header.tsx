"use client";

import { useConfig } from "@midl/react";
import { ConnectButton } from "@midl/satoshi-kit";
import { ArrowDownUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
	const { network } = useConfig();

	return (
		<div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
			<div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-xl bg-primary/10 grid place-items-center">
						<ArrowDownUp className="h-4 w-4" />
					</div>
					<div>
						<h1 className="text-lg font-semibold leading-none">Vault</h1>
						<p className="text-xs text-muted-foreground">
							Bitcoin Runes Deposit / Withdraw
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Badge variant="outline" className="rounded-xl capitalize">
						{network.id}
					</Badge>
					<ConnectButton />
				</div>
			</div>
		</div>
	);
};
