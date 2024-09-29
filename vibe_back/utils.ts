import { Address, BigInt } from "@graphprotocol/graph-ts"
import { DailyUserHistory } from "../generated/schema"
import { ReferralNFT } from "../generated/SymmDataSource/referralNFT"
import { Rakeback } from "../generated/SymmDataSource/rakeback"
import { RAKEBACK_ADDRESS, REFERRAL_NFT_ADDRESS } from "./config"

export const zero_address = Address.fromHexString("0x0000000000000000000000000000000000000000")

function getReferrerNftId(activeNftId: BigInt): BigInt {
	// returns 0 if the user has no referrer or the referrer is not a valid NFT
	const referralNft = ReferralNFT.bind(Address.fromString(REFERRAL_NFT_ADDRESS))
	const referrerNftIdRes = referralNft.try_referrer(activeNftId)
	if (referrerNftIdRes.reverted) {
		return BigInt.zero()
	} else {
		const referrerNftId = referrerNftIdRes.value
		const isActiveResult = referralNft.try_isActiveReferrer(referrerNftId)
		if (isActiveResult.reverted || !isActiveResult.value) {
			return BigInt.zero()
		} else {
			return referrerNftId
		}
	}
}

function getActiveNftId(account: Address): BigInt {
	const referralNft = ReferralNFT.bind(Address.fromString(REFERRAL_NFT_ADDRESS))
	let res = referralNft.try_tokenInUse(account)
	if (res.reverted) return BigInt.zero()
	return res.value
}

function getNftOwner(nftId: BigInt): Address {
	const referralNft = ReferralNFT.bind(Address.fromString(REFERRAL_NFT_ADDRESS))
	let res = referralNft.try_tokenAccountOwner(nftId)
	if (res.reverted) return Address.zero()
	return res.value
}

function getRakeback(tradeVolume: BigInt, feePaid: BigInt): BigInt {
	const rakeback = Rakeback.bind(Address.fromString(RAKEBACK_ADDRESS))
	let res = rakeback.try_getRakeback(tradeVolume, feePaid)
	if (res.reverted) return BigInt.fromI32(0)
	return res.value
}

function getReferralRakebackRatio(): BigInt {
	const rakeback = Rakeback.bind(Address.fromString(RAKEBACK_ADDRESS))
	let res = rakeback.try_referralRakebackRatio()
	if (res.reverted) return BigInt.fromI32(0)
	return res.value
}

function calculateTradeVolumeForUser(user: Address, account: Address, activeNftId: BigInt, day: BigInt): BigInt {
	const period = 30
	let total = BigInt.zero()
	for (let i = 1; i <= period; i++) {
		const accountHistoryId = user.toHex() + "-" + account.toHex() + "-" + activeNftId.toHexString() + "-" + day.minus(BigInt.fromI32(i)).toString()
		let dh = DailyUserHistory.load(accountHistoryId)
		if (dh) total = total.plus(dh.tradeVolume)
	}
	return total
}

export function updateDailyHistory(user: Address, account: Address, day: BigInt, tradeVolume: BigInt, fee: BigInt, timestamp: BigInt): void {
	const activeNftId = getActiveNftId(account)
	const referrerTokenId = getReferrerNftId(activeNftId)
	const referrerAccount = getNftOwner(referrerTokenId)
	const accountHistoryId = user.toHex() + "-" + account.toHex() + "-" + activeNftId.toHexString() + "-" + day.toString()

	let dh = DailyUserHistory.load(accountHistoryId)

	if (dh == null) {
		dh = new DailyUserHistory(accountHistoryId)
		dh.referrerNftId = referrerTokenId
		dh.activeNftId = activeNftId
		dh.user = user
		dh.account = account
		dh.referrerAccount = referrerAccount
		dh.day = day
		dh.tradeVolume = BigInt.zero()
		dh.platformFeePaid = BigInt.zero()
		dh.timestamp = timestamp
		dh.rakeback = BigInt.zero()
		dh.userRakebackShare = BigInt.zero()
	}

	dh.referrerNftId = referrerTokenId
	dh.referrerAccount = referrerAccount // May have changed during the day!
	dh.tradeVolume = dh.tradeVolume.plus(tradeVolume)
	dh.platformFeePaid = dh.platformFeePaid.plus(fee)
	if (referrerTokenId != BigInt.zero()) {
		dh.rakeback = getRakeback(dh.tradeVolume, dh.platformFeePaid)
		const scale = BigInt.fromI32(10).pow(18)
		const rakebackVolume = calculateTradeVolumeForUser(user, account, activeNftId, day).plus(dh.tradeVolume)
		dh.userRakebackShare = getRakeback(rakebackVolume, dh.platformFeePaid)
			.times(BigInt.fromI32(1).times(scale).minus(getReferralRakebackRatio()))
			.div(scale)
	} else {
		dh.rakeback = BigInt.zero()
		dh.userRakebackShare = BigInt.zero()
	}
	dh.lastUpdate = timestamp
	dh.save()
}

export function getAccountOwner(tokenId: BigInt): Address {
	const referralNft = ReferralNFT.bind(Address.fromString(REFERRAL_NFT_ADDRESS))
	let res = referralNft.try_tokenAccountOwner(tokenId)
	if (res.reverted) return Address.zero()
	return res.value
}
