import "core/Utils/array";
import "core/Utils/date";
import "core/Utils/string";
import "core/Utils/number";
import SuperJSON from "superjson";
import Big from "big.js";

// デフォルト切り捨て
Big.RM = Big.roundDown;

// Big.js
SuperJSON.registerCustom<Big, string>({
  isApplicable: (v): v is Big => v instanceof Big,
  serialize   : v => v.toFixed(),
  deserialize : v => new Big(v),
}, "big.js")
