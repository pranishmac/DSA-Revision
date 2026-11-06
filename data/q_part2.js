// Part 2: Math (8) + Prefix Sum (1) + Stack (8) + String/Intervals (5) + Trie (5) + Sliding Window (5) = 32 questions
const QUESTIONS_PART2 = [
// ─── MATH AND NUMBER THEORY ─────────────────────────────────────────────────
{
  id: 380, title: "Insert Delete GetRandom O(1)", topic: "Math and Number Theory", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/insert-delete-getrandom-o1/",
  description: "Implement the RandomizedSet class: insert(val), remove(val), and getRandom() — all operations must run in O(1) average time.\n\nExample:\nRandomizedSet r = new RandomizedSet();\nr.insert(1); // true\nr.remove(2); // false\nr.getRandom(); // returns 1 or 2 equally",
  intuition: "ArrayList gives O(1) random access and append. HashMap gives O(1) lookup and deletion. To delete from ArrayList in O(1): swap target with the last element, update the map, and remove the last element.",
  approach: "1. Store values in an ArrayList (for O(1) getRandom).\n2. Store value-to-index mapping in a HashMap (for O(1) lookup and delete).\n3. On insert: append to list, record index in map.\n4. On remove: swap target with last element, update map with new index of last element, pop from list, remove target from map.\n5. On getRandom: pick a random index in [0, list.size()-1].",
  javaSolution: `class RandomizedSet {
    private List<Integer> list = new ArrayList<>();
    private Map<Integer, Integer> map = new HashMap<>(); // val -> index in list
    private Random rand = new Random();

    public boolean insert(int val) {
        if (map.containsKey(val)) return false;
        map.put(val, list.size());
        list.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!map.containsKey(val)) return false;
        int idx = map.get(val);
        int lastVal = list.get(list.size() - 1);
        // Swap with last element to delete from ArrayList in O(1)
        list.set(idx, lastVal);
        map.put(lastVal, idx);
        list.remove(list.size() - 1);
        map.remove(val);
        return true;
    }

    public int getRandom() {
        return list.get(rand.nextInt(list.size()));
    }
}`,
  complexity: { time: "O(1) average for all operations", space: "O(n)" },
  simpleExplanation: "1. Use an ArrayList for fast random access and append.\n2. Use a HashMap to find where any value lives in the list.\n3. To delete in O(1), swap the target with the last element, then pop the end.",
  hints: ["ArrayList for getRandom in O(1)", "HashMap for O(1) lookup", "Swap with last element to delete from ArrayList in O(1)"],
  interviewNotes: ["Never delete from the middle of an ArrayList (O(n) shift)", "Swap-with-last trick is the standard DSA interview pattern", "Remember to update the HashMap after the swap"],
  oneLineAnswer: "Combine an ArrayList for O(1) random access with a HashMap for O(1) lookup; delete by swapping with the last element.",
  edgeCases: ["Removing when target is already the last element", "Removing non-existent element", "Single element set"],
  similar: [{id: 381, title: "Insert Delete GetRandom O(1) - Duplicates allowed"}]
},
{
  id: 13, title: "Roman to Integer", topic: "Math and Number Theory", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/roman-to-integer/",
  description: "Given a Roman numeral string, convert it to an integer. Roman symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.\n\nExample:\nInput: s = 'MCMXCIV'\nOutput: 1994",
  intuition: "Normally values are added left-to-right. But when a smaller numeral appears before a larger one (like IV=4 or IX=9), the smaller is subtracted.",
  approach: "1. Map Roman characters to integer values.\n2. Walk left-to-right: if current < next, subtract current; otherwise add current.\n3. Add the last character.\n4. Return the total.",
  javaSolution: `class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = Map.of(
            'I', 1, 'V', 5, 'X', 10, 'L', 50,
            'C', 100, 'D', 500, 'M', 1000
        );
        int total = 0, n = s.length();
        for (int i = 0; i < n; i++) {
            int curr = map.get(s.charAt(i));
            // If current is smaller than next, subtract (subtractive notation)
            if (i < n - 1 && curr < map.get(s.charAt(i + 1))) total -= curr;
            else total += curr;
        }
        return total;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Read numerals left-to-right.\n2. If a numeral is followed by a bigger one, subtract it (e.g. IV = -1 + 5 = 4).\n3. Otherwise just add it.",
  hints: ["Map.of for clean constant map", "Subtractive rule: curr < next means subtract", "Single pass"],
  interviewNotes: ["Subtractive notation is the only trick: if curr < next, subtract", "String length is small (at most 15), so time is effectively O(1)", "Compare with Integer to Roman (greedy with value arrays)"],
  oneLineAnswer: "Left-to-right pass: subtract current if it's less than the next numeral, otherwise add it.",
  edgeCases: ["Single numeral", "All additive (no subtractions): 'MMXX'", "Purely subtractive combinations"],
  similar: [{id: 12, title: "Integer to Roman"}]
},
{
  id: 12, title: "Integer to Roman", topic: "Math and Number Theory", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/integer-to-roman/",
  description: "Given an integer, convert it to a Roman numeral. Valid range: 1 to 3999.\n\nExample:\nInput: num = 1994\nOutput: 'MCMXCIV'",
  intuition: "Greedy approach: list all values (including subtractive pairs like 900=CM, 400=CD, 90=XC, 40=XL, 9=IX, 4=IV) in descending order. Repeatedly subtract the largest possible value and append its symbol.",
  approach: "1. Define parallel arrays of values and Roman symbols in descending order.\n2. While num > 0, find the largest value <= num, subtract it, and append the symbol.\n3. Return the assembled string.",
  javaSolution: `class Solution {
    private static final int[] VALS = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    private static final String[] SYMS = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};

    public String intToRoman(int num) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < VALS.length && num > 0; i++) {
            while (num >= VALS[i]) { // greedily pick the largest fitting value
                num -= VALS[i];
                sb.append(SYMS[i]);
            }
        }
        return sb.toString();
    }
}`,
  complexity: { time: "O(1) since num <= 3999", space: "O(1)" },
  simpleExplanation: "1. List all 13 standard Roman building blocks from 1000 down to 1.\n2. Include special cases like 900 (CM) and 4 (IV).\n3. Keep subtracting the largest one that fits and append its letters.",
  hints: ["Include subtractive pairs (900, 400, 90, 40, 9, 4) in the table", "Greedy: largest value first", "StringBuilder for efficiency"],
  interviewNotes: ["Greedy works because standard Roman numeral base values allow it", "Include all 13 values: 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1", "Max 15 iterations since num <= 3999"],
  oneLineAnswer: "Greedily subtract the largest Roman symbol value (including subtractive pairs like CM, CD) from the number.",
  edgeCases: ["num = 1: 'I'", "num = 3999: maximum valid value", "Numbers with many subtractive symbols like 1994"],
  similar: [{id: 13, title: "Roman to Integer"}]
},
{
  id: 9, title: "Palindrome Number", topic: "Math and Number Theory", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/palindrome-number/",
  description: "Given an integer x, return true if x is a palindrome without converting to a string.\n\nExample:\nInput: x = 121\nOutput: true",
  intuition: "Reverse only the second half of the number to avoid 32-bit integer overflow. Compare the first half with the reversed second half.",
  approach: "1. Negative numbers and numbers ending in 0 (except 0) are not palindromes.\n2. Reverse digits of x into reversedHalf until x <= reversedHalf.\n3. If length is even: x == reversedHalf.\n4. If length is odd: x == reversedHalf / 10 (discard middle digit).",
  javaSolution: `class Solution {
    public boolean isPalindrome(int x) {
        // Negatives and numbers ending in 0 (except 0 itself) cannot be palindromes
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int reversed = 0;
        while (x > reversed) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        // Even length: x == reversed; Odd length: x == reversed / 10
        return x == reversed || x == reversed / 10;
    }
}`,
  complexity: { time: "O(log10 n)", space: "O(1)" },
  simpleExplanation: "1. Negative numbers can't be palindromes (due to minus sign).\n2. Reverse digits from the back until we reach the middle.\n3. Compare the front half with the reversed back half.",
  hints: ["Reverse half the digits to avoid overflow", "Stop when x <= reversed", "Odd length: ignore middle digit with reversed/10"],
  interviewNotes: ["Follow-up: solve without string conversion (this solution does that)", "Reversing only half avoids integer overflow completely", "Edge case: numbers ending in 0 (like 10, 100) must be handled early"],
  oneLineAnswer: "Reverse the second half of the digits; check if first half equals reversed second half (or divided by 10 for odd length).",
  edgeCases: ["x < 0: false", "x = 0: true", "x ends with 0 (e.g. 10): false", "Single-digit numbers: true"],
  similar: [{id: 234, title: "Palindrome Linked List"}, {id: 125, title: "Valid Palindrome"}]
},
{
  id: 66, title: "Plus One", topic: "Math and Number Theory", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/plus-one/",
  description: "Given a large integer represented as an integer array of digits, increment it by one and return the result.\n\nExample:\nInput: digits = [1,2,9]\nOutput: [1,3,0]",
  intuition: "Scan right to left. If a digit is < 9, increment and return immediately. If it's 9, set it to 0 and carry to the next digit. If all are 9, prepend a 1.",
  approach: "1. Loop from the last digit backwards.\n2. If digits[i] < 9: digits[i]++, return digits.\n3. Otherwise digits[i] = 0 (carry propagates).\n4. If loop finishes, all were 9: create new array of size n+1 with leading 1.",
  javaSolution: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits; // no carry needed, done early
            }
            digits[i] = 0; // carry continues
        }
        // All digits were 9 (e.g. 999 -> 1000)
        int[] res = new int[digits.length + 1];
        res[0] = 1; // default values are already 0
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) amortized, O(n) worst case" },
  simpleExplanation: "1. Add 1 to the last digit.\n2. If it becomes 10, turn it into 0 and carry to the left.\n3. Repeat until a digit isn't 9, or if all are 9, make a new array starting with 1.",
  hints: ["Work from right to left", "Early return as soon as a digit < 9 is incremented", "All 9s case: return [1, 0, 0, ...]"],
  interviewNotes: ["Early return optimization makes average case O(1)", "All-9 case (999 -> 1000) only needs setting index 0 to 1 since new int[] defaults to 0", "Clean and concise implementation"],
  oneLineAnswer: "Right-to-left: increment the first non-9 digit and return; if all are 9, return new array [1, 0, ...].",
  edgeCases: ["[9] -> [1, 0]", "No carries: [1, 2, 3] -> [1, 2, 4]", "Multiple carries: [9, 9] -> [1, 0, 0]"],
  similar: [{id: 67, title: "Add Binary"}, {id: 415, title: "Add Strings"}]
},
{
  id: 172, title: "Factorial Trailing Zeroes", topic: "Math and Number Theory", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/factorial-trailing-zeroes/",
  description: "Given an integer n, return the number of trailing zeroes in n!.\n\nExample:\nInput: n = 5\nOutput: 1 (5! = 120)",
  intuition: "Trailing zeroes come from factors of 10 = 2 * 5. Factors of 2 are always more abundant than 5, so count the number of times 5 appears as a factor in numbers 1..n. Include multiples of 5, 25, 125, etc.",
  approach: "1. Initialize count = 0.\n2. While n > 0: count += n / 5, then n /= 5.\n3. Return count.",
  javaSolution: `class Solution {
    public int trailingZeroes(int n) {
        int count = 0;
        // Count factors of 5, 25, 125... in n!
        while (n > 0) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }
}`,
  complexity: { time: "O(log5 n)", space: "O(1)" },
  simpleExplanation: "1. A trailing zero comes from 2 * 5.\n2. There are way more 2s than 5s, so just count the factors of 5.\n3. Divide n by 5, then 25, then 125... and sum up.",
  hints: ["Trailing zeroes = count of factor 5 in prime factorization of n!", "Numbers like 25 have two factors of 5: count n/5, n/25, n/125...", "Loop runs log5(n) times"],
  interviewNotes: ["Legendre's formula: sum of floor(n / 5^k) for k >= 1", "Never calculate n! directly — it overflows quickly", "Time complexity is logarithmic in base 5"],
  oneLineAnswer: "Count factors of 5 in n! using Legendre's formula: sum of floor(n/5^k) for k >= 1.",
  edgeCases: ["n = 0: 0 zeroes", "n < 5: 0 zeroes", "Powers of 5 like 25 contribute extra zeroes"],
  similar: [{id: 793, title: "Preimage Size of Factorial Zeroes Function"}]
},
{
  id: 50, title: "Pow(x, n)", topic: "Math and Number Theory", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/powx-n/",
  description: "Implement pow(x, n), which calculates x raised to the power n.\n\nExample:\nInput: x = 2.0, n = 10\nOutput: 1024.0",
  intuition: "Binary exponentiation (divide and conquer): x^n = (x*x)^(n/2) if n is even, and x * (x*x)^(n/2) if n is odd. Halves the work at every step.",
  approach: "1. Handle n < 0 by setting x = 1/x and using long for n to avoid Integer.MIN_VALUE overflow.\n2. While N > 0:\n   - If N is odd, multiply result by x.\n   - Square x and halve N.\n3. Return result.",
  javaSolution: `class Solution {
    public double myPow(double x, int n) {
        long N = n; // use long to prevent overflow on Integer.MIN_VALUE
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double res = 1.0;
        double curr = x;
        // Binary exponentiation: square the base, halve the power
        while (N > 0) {
            if ((N % 2) == 1) res *= curr;
            curr *= curr;
            N /= 2;
        }
        return res;
    }
}`,
  complexity: { time: "O(log n)", space: "O(1)" },
  simpleExplanation: "1. To compute 2^10, think of it as (2*2)^5 = 4^5.\n2. Whenever the exponent is odd, multiply the running answer by the current base.\n3. Always square the base and cut the exponent in half.",
  hints: ["Binary exponentiation: square base, halve exponent", "Watch out for Integer.MIN_VALUE: -n overflows int!", "Cast n to long before negating"],
  interviewNotes: ["Critical trap: Integer.MIN_VALUE cannot be negated in 32-bit signed int — must use long", "Iterative is preferred over recursive to save call stack space", "Standard algorithm used in cryptography"],
  oneLineAnswer: "Binary exponentiation: square the base and halve the exponent each step in O(log n) time.",
  edgeCases: ["n = Integer.MIN_VALUE: must use long", "n = 0: returns 1.0", "x = 0: returns 0.0"],
  similar: [{id: 69, title: "Sqrt(x)"}, {id: 372, title: "Super Pow"}]
},
{
  id: 149, title: "Max Points on a Line", topic: "Math and Number Theory", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/max-points-on-a-line/",
  description: "Given an array of points where points[i] = [xi, yi], return the maximum number of points that lie on the same straight line.\n\nExample:\nInput: points = [[1,1],[2,2],[3,3]]\nOutput: 3",
  intuition: "For each point, calculate the slopes to all other points. Points with the exact same slope relative to the anchor point lie on the same line. Reduce slopes using GCD to avoid floating-point inaccuracies.",
  approach: "1. If points <= 2, return points.length.\n2. For each anchor point i:\n   - Build a slope-to-count map for all other points j > i.\n   - Represent slope as irreducible fraction dy/dx using GCD.\n   - Track maximum count with the same slope for this anchor.\n3. Return global max + 1 (the anchor point itself).",
  javaSolution: `class Solution {
    public int maxPoints(int[][] points) {
        int n = points.length;
        if (n <= 2) return n;
        int maxPoints = 1;
        for (int i = 0; i < n; i++) {
            Map<String, Integer> slopes = new HashMap<>();
            int localMax = 0;
            for (int j = i + 1; j < n; j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(dx, dy);
                dx /= g; dy /= g;
                // Standardize signs for map key
                if (dx < 0 || (dx == 0 && dy < 0)) { dx = -dx; dy = -dy; }
                String key = dy + "/" + dx;
                slopes.put(key, slopes.getOrDefault(key, 0) + 1);
                localMax = Math.max(localMax, slopes.get(key));
            }
            maxPoints = Math.max(maxPoints, localMax + 1); // +1 for anchor point itself
        }
        return maxPoints;
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}`,
  complexity: { time: "O(n²)", space: "O(n)" },
  simpleExplanation: "1. Pick one point as an anchor.\n2. Find the slope from the anchor to every other point.\n3. The slope that shows up the most gives the most collinear points with that anchor.\n4. Repeat for every point and take the maximum.",
  hints: ["Never use floating-point slopes (precision bugs) — use dy/dx simplified with GCD", "Only need to check pairs j > i", "Add 1 for the anchor point itself"],
  interviewNotes: ["Floating point slopes have precision bugs in Java — use reduced fraction string dy/dx", "Euclidean GCD algorithm normalizes fractions", "O(n²) is optimal since any pair can determine a line"],
  oneLineAnswer: "For each anchor point, count slopes to all other points using irreducible dy/dx fractions via GCD; take max.",
  edgeCases: ["n <= 2: return n directly", "Vertical lines (dx = 0)", "Horizontal lines (dy = 0)"],
  similar: [{id: 356, title: "Line Reflection"}]
},

// ─── PREFIX SUM ─────────────────────────────────────────────────────────────
{
  id: 238, title: "Product of Array Except Self", topic: "Prefix Sum", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
  description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i], in O(n) without division.\n\nExample:\nInput: nums = [1,2,3,4]\nOutput: [24,12,8,6]",
  intuition: "The product except self at i is: (product of elements before i) * (product of elements after i). Compute left prefix products, then sweep from the right with a running suffix product.",
  approach: "1. Create result array res. Fill res[i] with the product of all elements to the left of i.\n2. Maintain a running rightProduct variable starting at 1.\n3. Sweep from right to left: multiply res[i] by rightProduct, then update rightProduct *= nums[i].\n4. Return res in O(1) extra space.",
  javaSolution: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        // Pass 1: compute prefix products on the left
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        // Pass 2: multiply by running suffix product on the right
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) extra space (output array doesn't count)" },
  simpleExplanation: "1. In pass 1, each slot gets the product of everything to its left.\n2. In pass 2, walk backwards and multiply each slot by everything to its right.\n3. Result is product of everything except that element, with zero division.",
  hints: ["Product = (left prefix product) * (right suffix product)", "Do left pass into the result array", "Do right pass with a single accumulator variable"],
  interviewNotes: ["Division is forbidden by problem constraints", "O(1) extra space achieved by reusing the output array for prefix products", "Handles zeros naturally without special-casing"],
  oneLineAnswer: "Store left prefix products in the output array, then sweep backwards multiplying by a running suffix product.",
  edgeCases: ["One zero in array: only that index has non-zero result", "Multiple zeros: entire output is zero", "Negative numbers"],
  similar: [{id: 42, title: "Trapping Rain Water"}, {id: 152, title: "Maximum Product Subarray"}]
},

// ─── STACK ──────────────────────────────────────────────────────────────────
{
  id: 42, title: "Trapping Rain Water", topic: "Stack", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
  description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample:\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
  intuition: "Water trapped at index i is determined by min(maxLeft, maxRight) - height[i]. Two pointers from each end can maintain maxLeft and maxRight. Move the pointer on the smaller side inward because water level there is strictly bounded.",
  approach: "1. Two pointers l = 0, r = n - 1; leftMax = 0, rightMax = 0.\n2. While l < r:\n   - If height[l] < height[r]: if height[l] >= leftMax update it; else water += leftMax - height[l]; l++.\n   - Else: if height[r] >= rightMax update it; else water += rightMax - height[r]; r--.\n3. Return total water.",
  javaSolution: `class Solution {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                // Water bounded by leftMax since height[r] is guaranteed taller
                if (height[l] >= leftMax) leftMax = height[l];
                else water += leftMax - height[l];
                l++;
            } else {
                // Water bounded by rightMax
                if (height[r] >= rightMax) rightMax = height[r];
                else water += rightMax - height[r];
                r--;
            }
        }
        return water;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Water at any spot is trapped between the tallest wall to its left and right.\n2. Use two pointers from the ends.\n3. Move whichever side has the shorter wall inward, adding trapped water along the way.",
  hints: ["Water at i = min(maxLeft, maxRight) - height[i]", "Two pointers achieves O(1) space", "Always advance the side with smaller height"],
  interviewNotes: ["Two-pointer approach is O(1) space and optimal", "Monotonic stack approach is also valid (computes horizontally layer by layer)", "Precomputed prefix/suffix arrays approach is O(n) space"],
  oneLineAnswer: "Two pointers from ends: track leftMax and rightMax, advance the smaller side and accumulate trapped water.",
  edgeCases: ["Fewer than 3 bars: cannot trap water", "Strictly increasing or decreasing heights: 0 water", "Flat terrain: 0 water"],
  similar: [{id: 11, title: "Container With Most Water"}, {id: 84, title: "Largest Rectangle in Histogram"}]
},
{
  id: 20, title: "Valid Parentheses", topic: "Stack", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
  description: "Given a string containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid (brackets closed in correct order and type).\n\nExample:\nInput: s = '()[]{}'\nOutput: true",
  intuition: "Every closing bracket must match the most recently opened unmatched bracket. A LIFO stack naturally models this requirement.",
  approach: "1. Use an ArrayDeque as a stack.\n2. For each char: if opening bracket, push matching closing bracket onto stack.\n3. If closing bracket: pop from stack and check if it matches; if stack empty or mismatch, return false.\n4. Return true if stack is empty at the end.",
  javaSolution: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            // Push expected closing bracket for clean matching
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Walk through the brackets.\n2. When you see an opening bracket, push the expected closing bracket onto the stack.\n3. When you see a closing bracket, pop and ensure it matches.",
  hints: ["Push expected closing bracket onto stack for clean single-line checks", "Use ArrayDeque instead of legacy java.util.Stack", "Don't forget to check stack.isEmpty() at the end"],
  interviewNotes: ["Pushing expected closing bracket simplifies matching logic", "Prefer Deque/ArrayDeque over legacy synchronized Stack class in Java", "Length must be even for valid string (quick optimization)"],
  oneLineAnswer: "Push expected closing brackets onto a stack when opening brackets appear; pop and match on closing brackets.",
  edgeCases: ["Odd length string: immediately false", "Starts with closing bracket: empty stack pop", "Unclosed opening brackets remaining"],
  similar: [{id: 22, title: "Generate Parentheses"}, {id: 71, title: "Simplify Path"}]
},
{
  id: 71, title: "Simplify Path", topic: "Stack", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/simplify-path/",
  description: "Given a Unix-style absolute path string, simplify it to the canonical path (resolving '.' for current directory, '..' for parent directory, and multiple slashes).\n\nExample:\nInput: path = '/a/./b/../../c/'\nOutput: '/c'",
  intuition: "Split by '/'. Consecutive slashes become empty strings. Ignore '.' and empty tokens. '..' pops the last directory from a stack. All valid folder names get pushed.",
  approach: "1. Split path by '/'.\n2. Use a Deque as a stack.\n3. For each token: if '..' and stack not empty, pop; if not '', '.', or '..', push.\n4. Join remaining stack elements with '/' prefixed by '/'.",
  javaSolution: `class Solution {
    public String simplifyPath(String path) {
        Deque<String> stack = new ArrayDeque<>();
        for (String part : path.split("/")) {
            if (part.equals("..")) {
                if (!stack.isEmpty()) stack.pop(); // go up to parent
            } else if (!part.isEmpty() && !part.equals(".")) {
                stack.push(part); // regular directory
            }
        }
        if (stack.isEmpty()) return "/";
        StringBuilder sb = new StringBuilder();
        // Iterator on Deque visits from head; stack.descendingIterator() visits bottom-to-top
        var it = stack.descendingIterator();
        while (it.hasNext()) sb.append("/").append(it.next());
        return sb.toString();
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Split the path by slashes.\n2. Ignore empty parts and single dots (current directory).\n3. Double dots mean go up: pop the last folder.\n4. Any regular folder name gets pushed.\n5. Stitch together with slashes.",
  hints: ["split('/') naturally handles multiple slashes", "Double dot '..' pops from stack", "descendingIterator() rebuilds path from root to leaf"],
  interviewNotes: ["Root directory cannot be popped by '..' (e.g. '/../' stays '/')", "Use descendingIterator() to reconstruct path in FIFO order", "Corner case: empty stack must return '/'"],
  oneLineAnswer: "Split on '/', use a stack to push directories and pop on '..', then join remaining tokens from root down.",
  edgeCases: ["'/../' -> '/' (cannot pop past root)", "'///' multiple slashes", "'/.' current directory"],
  similar: [{id: 20, title: "Valid Parentheses"}, {id: 150, title: "Evaluate Reverse Polish Notation"}]
},
{
  id: 155, title: "Min Stack", topic: "Stack", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/min-stack/",
  description: "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.\n\nExample:\nMinStack s = new MinStack();\ns.push(-2); s.push(0); s.push(-3);\ns.getMin(); // -3\ns.pop();\ns.top();    // 0\ns.getMin(); // -2",
  intuition: "Maintain a secondary minStack that tracks the running minimum at each depth. When pushing x, push min(x, currentMin) to minStack.",
  approach: "1. Main stack holds all values.\n2. minStack holds the minimum value corresponding to every state of the main stack.\n3. push(val): push val to main, push min(val, minStack.peek()) to minStack.\n4. pop(): pop from both.\n5. top(): peek main. getMin(): peek minStack.",
  javaSolution: `class MinStack {
    private Deque<Integer> stack = new ArrayDeque<>();
    private Deque<Integer> minStack = new ArrayDeque<>();

    public MinStack() {}

    public void push(int val) {
        stack.push(val);
        // Track current minimum at this stack depth
        if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
        else minStack.push(minStack.peek());
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
  complexity: { time: "O(1) for all operations", space: "O(n)" },
  simpleExplanation: "1. Keep two stacks.\n2. One stack stores actual values.\n3. The other stack tracks the smallest value seen up to that point.\n4. getMin() simply peeks at the second stack in O(1).",
  hints: ["Keep parallel minStack tracking running minimums", "Every push pushes to both stacks", "Every pop pops from both stacks"],
  interviewNotes: ["Two-stack approach is clean, readable, and avoids value overflow", "Alternative: store pairs (val, currentMin) in a single stack", "Space optimization: only push to minStack when val <= currentMin"],
  oneLineAnswer: "Maintain a secondary minStack tracking running minimums; all operations peek or push/pop both in O(1).",
  edgeCases: ["Duplicate minimum values", "Popping the minimum element", "Negative numbers"],
  similar: [{id: 716, title: "Max Stack"}, {id: 232, title: "Implement Queue using Stacks"}]
},
{
  id: 150, title: "Evaluate Reverse Polish Notation", topic: "Stack", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
  description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix). Valid operators: '+', '-', '*', '/'. Integer division truncates toward zero.\n\nExample:\nInput: tokens = ['2','1','+','3','*']\nOutput: 9 ((2 + 1) * 3)",
  intuition: "In postfix notation, an operator applies to the two most recent operands. A stack stores numbers; whenever an operator is seen, pop two numbers, evaluate, and push the result.",
  approach: "1. Loop through tokens.\n2. If token is a number: parse and push to stack.\n3. If token is an operator: pop b then a, compute a op b (order matters for - and /), push result.\n4. Return the single remaining number on the stack.",
  javaSolution: `class Solution {
    public int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String t : tokens) {
            if ("+-*/".contains(t) && t.length() == 1) {
                int b = stack.pop(); // second operand
                int a = stack.pop(); // first operand
                switch (t) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                }
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Read tokens one by one.\n2. If it's a number, push to stack.\n3. If it's an operator (+, -, *, /), pop the top two numbers, apply the operation, and push result.\n4. Final answer is on top of stack.",
  hints: ["Remember operand order: first popped is b, second is a; compute a - b, not b - a", "Java switch expression is clean", "Single pass O(n)"],
  interviewNotes: ["Operand order is the classic trap: second popped is left operand, first popped is right", "Integer division in Java naturally truncates toward zero", "Postfix eliminates the need for parenthesis handling"],
  oneLineAnswer: "Push numbers onto stack; on operator, pop b then a, compute a op b, and push result back.",
  edgeCases: ["Single number (no operations)", "Negative numbers (ensure '-' operator check doesn't clash with negative numbers)", "Division truncating toward zero"],
  similar: [{id: 224, title: "Basic Calculator"}, {id: 227, title: "Basic Calculator II"}]
},
{
  id: 224, title: "Basic Calculator", topic: "Stack", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/basic-calculator/",
  description: "Implement a basic calculator to evaluate a simple expression string containing digits, '+', '-', '(', ')', and spaces.\n\nExample:\nInput: s = '(1+(4+5+2)-3)+(6+8)'\nOutput: 23",
  intuition: "Signs (+1 or -1) determine the contribution of each number. Parentheses distribute the outer sign to inner terms. Use a stack to save the running result and active sign when entering a '('.",
  approach: "1. Variables: res = 0, num = 0, sign = 1. Stack holds previous results and signs.\n2. Digit: build num.\n3. '+' or '-': add sign * num to res, reset num = 0, update sign.\n4. '(': push res, push sign, reset res = 0, sign = 1.\n5. ')': add sign * num to res, res = stack.pop() * res + stack.pop().\n6. Add remaining sign * num at the end.",
  javaSolution: `class Solution {
    public int calculate(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        int res = 0, num = 0, sign = 1; // 1 for +, -1 for -
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } else if (c == '+') {
                res += sign * num;
                num = 0;
                sign = 1;
            } else if (c == '-') {
                res += sign * num;
                num = 0;
                sign = -1;
            } else if (c == '(') {
                // Save current context onto stack
                stack.push(res);
                stack.push(sign);
                res = 0;
                sign = 1;
            } else if (c == ')') {
                res += sign * num;
                num = 0;
                // Pop sign first, then previous result
                res *= stack.pop();
                res += stack.pop();
            }
        }
        return res + sign * num;
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Track current total, current number, and current sign (+1 or -1).\n2. When opening '(', push the total and sign onto the stack and start fresh inside.\n3. When closing ')', finish the parenthesis sum, multiply by the stored sign, and add to outer sum.",
  hints: ["Keep running res, num, and sign (+1 or -1)", "On '(': push res, push sign, reset both", "On ')': finish inner result, multiply by popped sign, add popped res"],
  interviewNotes: ["Only + and - means we don't need operator precedence trees", "Stack stores pairs: [previous_res, previous_sign]", "Remember to flush the trailing number after the loop"],
  oneLineAnswer: "Maintain running result and sign; push them onto stack on '(', pop and integrate back on ')'.",
  edgeCases: ["Spaces between characters", "Unary minus at start or after '(': handles naturally with sign", "Deeply nested parentheses"],
  similar: [{id: 227, title: "Basic Calculator II"}, {id: 772, title: "Basic Calculator III"}]
},
{
  id: 173, title: "Binary Search Tree Iterator", topic: "Stack", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/binary-search-tree-iterator/",
  description: "Implement the BSTIterator class that represents an in-order iterator over the binary search tree (BST). next() and hasNext() must run in O(1) amortized time with O(h) memory.\n\nExample:\nBSTIterator it = new BSTIterator(root);\nit.next();    // 3\nit.next();    // 7\nit.hasNext(); // true",
  intuition: "Controlled in-order traversal using a custom stack. Push all left children down to the leaf. next() pops the smallest, then pushes all left children of its right child. Stack depth never exceeds tree height h.",
  approach: "1. Maintain a stack of TreeNode.\n2. Helper pushAllLeft(node): while node != null, stack.push(node), node = node.left.\n3. Constructor calls pushAllLeft(root).\n4. hasNext(): return !stack.isEmpty().\n5. next(): pop node, call pushAllLeft(node.right), return node.val.",
  javaSolution: `class BSTIterator {
    private Deque<TreeNode> stack = new ArrayDeque<>();

    public BSTIterator(TreeNode root) {
        pushAllLeft(root);
    }

    public int next() {
        TreeNode curr = stack.pop();
        if (curr.right != null) pushAllLeft(curr.right);
        return curr.val;
    }

    public boolean hasNext() {
        return !stack.isEmpty();
    }

    private void pushAllLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
}`,
  complexity: { time: "O(1) amortized for next(), O(1) for hasNext()", space: "O(h) where h is tree height" },
  simpleExplanation: "1. Push down the entire left spine of the tree onto a stack.\n2. The top of the stack is always the next smallest element in the BST.\n3. When popped, if it has a right subtree, push that subtree's left spine.",
  hints: ["Controlled in-order traversal with explicit stack", "Stack only holds at most h nodes (tree height)", "Amortized O(1): each node is pushed and popped at most once"],
  interviewNotes: ["Amortized analysis: n nodes total, each pushed and popped exactly once across all next() calls = 2n operations / n calls = O(1)", "Space is strictly O(h), not O(n) — interviewers look for this", "Standard iterator design pattern implementation"],
  oneLineAnswer: "Controlled in-order traversal: maintain a stack of left-spine nodes; pop next smallest and push right child's left-spine in O(h) space.",
  edgeCases: ["Single node tree", "Skewed tree (h = n)", "Complete binary tree (h = log n)"],
  similar: [{id: 94, title: "Binary Tree Inorder Traversal"}, {id: 230, title: "Kth Smallest Element in a BST"}]
},
{
  id: 918, title: "Maximum Sum Circular Subarray", topic: "Stack", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
  description: "Given a circular integer array nums, find the maximum possible sum of a non-empty subarray.\n\nExample:\nInput: nums = [1,-2,3,-2]\nOutput: 3\nInput: nums = [5,-3,5]\nOutput: 10 (subarray [5, 5])",
  intuition: "A circular max subarray is either: 1) Normal non-wrapping (standard Kadane's max), or 2) Wrapping around ends (totalSum - Kadane's minSubarray). If all numbers are negative, totalSum == minSum, so just return maxKadane.",
  approach: "1. Run Kadane's for max subarray sum.\n2. Run Kadane's for min subarray sum.\n3. Compute totalSum of the array.\n4. If totalSum == minSum (all negative), return maxSum.\n5. Otherwise return max(maxSum, totalSum - minSum).",
  javaSolution: `class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int totalSum = 0;
        int currMax = 0, maxSum = nums[0];
        int currMin = 0, minSum = nums[0];
        for (int x : nums) {
            // Kadane for max subarray
            currMax = Math.max(x, currMax + x);
            maxSum = Math.max(maxSum, currMax);
            // Kadane for min subarray
            currMin = Math.min(x, currMin + x);
            minSum = Math.min(minSum, currMin);
            totalSum += x;
        }
        // If all elements are negative, totalSum - minSum == 0 (empty array not allowed)
        return maxSum > 0 ? Math.max(maxSum, totalSum - minSum) : maxSum;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. A circular subarray either doesn't wrap (standard max subarray) or wraps around the edges.\n2. Wrapping max = totalSum minus the smallest middle subarray.\n3. Run Kadane's twice in one loop: find max and min subarrays. Return the larger.",
  hints: ["Two cases: standard subarray or wrapping subarray", "Wrapping max = totalSum - minSubarray", "Special edge case: all negative numbers"],
  interviewNotes: ["Brilliant Kadane extension: wrapping max is dual to min subarray", "All-negative edge case is critical: must return maxSum, not total - min (which gives 0, representing empty subarray)", "Single-pass O(n) time, O(1) space"],
  oneLineAnswer: "max(standard Kadane, totalSum - min Kadane); handle all-negative case by returning standard Kadane.",
  edgeCases: ["All negative elements (totalSum == minSum): return maxSum", "Single element", "Array with all positive elements"],
  similar: [{id: 53, title: "Maximum Subarray"}, {id: 152, title: "Maximum Product Subarray"}]
},

// ─── OTHER / STRING AND INTERVALS ───────────────────────────────────────────
{
  id: 58, title: "Length of Last Word", topic: "Other / String and Intervals", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/length-of-last-word/",
  description: "Given a string s consisting of words and spaces, return the length of the last word in the string.\n\nExample:\nInput: s = '   fly me   to   the moon  '\nOutput: 4 ('moon')",
  intuition: "Scan backwards. Skip trailing spaces first, then count characters until the next space or the start of the string.",
  approach: "1. Start pointer i at s.length() - 1.\n2. Skip trailing spaces: while i >= 0 and s.charAt(i) == ' ', i--.\n3. Count characters: while i >= 0 and s.charAt(i) != ' ', len++, i--.\n4. Return len.",
  javaSolution: `class Solution {
    public int lengthOfLastWord(String s) {
        int i = s.length() - 1, len = 0;
        // Skip trailing spaces
        while (i >= 0 && s.charAt(i) == ' ') i--;
        // Count last word length
        while (i >= 0 && s.charAt(i) != ' ') {
            len++;
            i--;
        }
        return len;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Start from the very end of the string.\n2. Walk backwards past any trailing spaces.\n3. Once you hit letters, count them until you hit another space.",
  hints: ["Traverse backwards from the end", "Skip trailing whitespace first", "O(1) space — no trim() or split() necessary"],
  interviewNotes: ["Scanning backwards avoids allocating memory with trim() or split()", "O(1) auxiliary space is optimal", "Handles multiple consecutive spaces gracefully"],
  oneLineAnswer: "Scan backwards: skip trailing spaces, then count characters until the next space.",
  edgeCases: ["Trailing spaces", "Leading spaces", "Only one word", "Single character"],
  similar: [{id: 151, title: "Reverse Words in a String"}]
},
{
  id: 6, title: "Zigzag Conversion", topic: "Other / String and Intervals", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/zigzag-conversion/",
  description: "Write the code that will take a string and display it in a zigzag pattern given a number of rows, then read line by line.\n\nExample:\nInput: s = 'PAYPALISHIRING', numRows = 3\nOutput: 'PAHNAPLSIIGYIR'",
  intuition: "Simulate bouncing a ball between row 0 and row numRows - 1. Assign each character to its current row, then reverse direction when hitting the top or bottom.",
  approach: "1. If numRows == 1 or numRows >= s.length(), return s.\n2. Create an array of StringBuilders, one per row.\n3. Track currRow = 0 and goingDown = false.\n4. For each character, append to rows[currRow]. If currRow is 0 or numRows-1, flip goingDown. Update currRow.\n5. Combine all rows.",
  javaSolution: `class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) return s;
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();
        int currRow = 0;
        boolean goingDown = false;
        for (char c : s.toCharArray()) {
            rows[currRow].append(c);
            // Flip direction at top and bottom boundaries
            if (currRow == 0 || currRow == numRows - 1) goingDown = !goingDown;
            currRow += goingDown ? 1 : -1;
        }
        StringBuilder res = new StringBuilder();
        for (StringBuilder r : rows) res.append(r);
        return res.toString();
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Imagine writing letters on lines while moving down, then bouncing up at the bottom.\n2. Maintain an array of StringBuilders for each line.\n3. Bounce direction whenever you hit row 0 or the bottom row.\n4. Concatenate rows.",
  hints: ["Bounce row pointer: toggle goingDown at boundaries 0 and numRows - 1", "numRows == 1 base case must be handled early", "StringBuilder array for O(n) assembly"],
  interviewNotes: ["Direction flag goingDown simplifies the bounce logic", "Base case check numRows == 1 prevents infinite loop/index error", "Alternative: compute cycle length 2 * numRows - 2 for O(1) space math approach"],
  oneLineAnswer: "Simulate row traversal by bouncing a row index between 0 and numRows-1; collect characters in row StringBuilders.",
  edgeCases: ["numRows = 1: return s immediately", "numRows >= s.length(): return s", "Small string"],
  similar: []
},
{
  id: 68, title: "Text Justification", topic: "Other / String and Intervals", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/text-justification/",
  description: "Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.\n\nExample:\nInput: words = ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], maxWidth = 16\nOutput:\n[\n   'This    is    an',\n   'example  of text',\n   'justification.  '\n]",
  intuition: "Pack as many words as possible per line (accounting for at least 1 space between words). Distribute extra spaces evenly between words, with leftover spaces going to the leftmost gaps. The last line and single-word lines are left-justified.",
  approach: "1. Greedily find how many words fit in the current line.\n2. If it's the last line OR line has only 1 word: left-justify (single space between words, pad rest with spaces at the end).\n3. Otherwise: fully justify. Calculate totalSpaces = maxWidth - wordLenSum. Divide spaces evenly across gaps: base = totalSpaces / gaps, extra = totalSpaces % gaps. Leftmost 'extra' gaps get base + 1 spaces.",
  javaSolution: `class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> res = new ArrayList<>();
        int i = 0, n = words.length;
        while (i < n) {
            int j = i + 1, lineLen = words[i].length();
            while (j < n && lineLen + 1 + words[j].length() <= maxWidth) {
                lineLen += 1 + words[j].length();
                j++;
            }
            StringBuilder sb = new StringBuilder();
            int numWords = j - i;
            // Last line or single word: left-justify
            if (j == n || numWords == 1) {
                for (int k = i; k < j; k++) {
                    sb.append(words[k]);
                    if (k < j - 1) sb.append(" ");
                }
                while (sb.length() < maxWidth) sb.append(" ");
            } else {
                // Fully justify
                int totalSpaces = maxWidth - (lineLen - (numWords - 1));
                int baseSpaces = totalSpaces / (numWords - 1);
                int extraSpaces = totalSpaces % (numWords - 1);
                for (int k = i; k < j; k++) {
                    sb.append(words[k]);
                    if (k < j - 1) {
                        int spaces = baseSpaces + (k - i < extraSpaces ? 1 : 0);
                        sb.append(" ".repeat(spaces));
                    }
                }
            }
            res.add(sb.toString());
            i = j;
        }
        return res;
    }
}`,
  complexity: { time: "O(n) where n is total characters", space: "O(n)" },
  simpleExplanation: "1. For each line, greedily pack as many words as fit.\n2. If it's the last line or just one word: left-align and pad spaces at the end.\n3. Otherwise: distribute spaces evenly between words, giving extra remainder spaces to the leftmost slots.",
  hints: ["Greedy word packing: length + 1 + nextWord <= maxWidth", "Two distinct formatting rules: standard line vs last/single-word line", "Modulo division totalSpaces % gaps handles uneven space distribution"],
  interviewNotes: ["Classic simulation problem: test-case accuracy and clean modular structure are evaluated", "Check boundaries carefully: single word on a line needs trailing spaces", "String.repeat() is available in Java 11+"],
  oneLineAnswer: "Greedily pack words per line; distribute spaces evenly across gaps (left-justify last line and single-word lines).",
  edgeCases: ["Single word on a line: pad right with spaces", "Last line must be left-justified", "Words that exactly fill maxWidth"],
  similar: []
},
{
  id: 228, title: "Summary Ranges", topic: "Other / String and Intervals", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/summary-ranges/",
  description: "Given a sorted unique integer array nums, return the smallest sorted list of ranges that cover all the numbers in the array exactly.\n\nExample:\nInput: nums = [0,1,2,4,5,7]\nOutput: ['0->2','4->5','7']",
  intuition: "Scan through nums. When consecutive numbers are adjacent (nums[i+1] == nums[i] + 1), extend the current range. When a gap appears, close the current range and start a new one.",
  approach: "1. Iterate i from 0 to n - 1.\n2. Record start = nums[i].\n3. While i + 1 < n and nums[i+1] == nums[i] + 1, advance i.\n4. If start == nums[i], format as 'start'; otherwise 'start->nums[i]'.\n5. Append to result and continue.",
  javaSolution: `class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            int start = nums[i];
            // Extend range while consecutive elements differ by 1
            while (i + 1 < n && nums[i + 1] == nums[i] + 1) i++;
            if (start == nums[i]) res.add(String.valueOf(start));
            else res.add(start + "->" + nums[i]);
        }
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) extra space" },
  simpleExplanation: "1. Pick the start of a range.\n2. Keep advancing as long as the next number is exactly 1 greater.\n3. If start equals end, format as a single number; otherwise format as start->end.\n4. Repeat for the whole list.",
  hints: ["Inner while loop advances i while consecutive", "Check if start == nums[i] for single element formatting", "Single pass O(n)"],
  interviewNotes: ["Notice the loop variable i is advanced both in the inner while and the for loop — standard two-pointer pattern", "Watch out for integer overflow if checking nums[i+1] - nums[i] == 1 — better to use nums[i+1] == nums[i] + 1", "Clean O(n) time"],
  oneLineAnswer: "Walk through array extending a range while nums[i+1] == nums[i] + 1; format as 'a' or 'a->b'.",
  edgeCases: ["Empty array: return empty list", "Single element: ['num']", "No consecutive numbers: each is its own range"],
  similar: [{id: 56, title: "Merge Intervals"}, {id: 352, title: "Data Stream as Disjoint Intervals"}]
},
{
  id: 57, title: "Insert Interval", topic: "Other / String and Intervals", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
  description: "Given an array of non-overlapping intervals sorted by start time, insert newInterval into intervals (merge if necessary).\n\nExample:\nInput: intervals = [[1,3],[6,9]], newInterval = [2,5]\nOutput: [[1,5],[6,9]]",
  intuition: "Three stages: 1) Add all intervals that end before newInterval starts. 2) Merge all intervals that overlap with newInterval (expand start and end). 3) Add all intervals that start after newInterval ends.",
  approach: "1. Add intervals ending before newInterval starts: intervals[i][1] < newInterval[0].\n2. While overlapping (intervals[i][0] <= newInterval[1]): update newInterval[0] = min, newInterval[1] = max.\n3. Add merged newInterval.\n4. Add remaining intervals.",
  javaSolution: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0, n = intervals.length;
        // Phase 1: add all intervals that come before newInterval
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.add(intervals[i++]);
        }
        // Phase 2: merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        // Phase 3: add all remaining intervals
        while (i < n) {
            res.add(intervals[i++]);
        }
        return res.toArray(new int[0][]);
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Copy over intervals that are completely to the left.\n2. For any interval that overlaps, merge it by stretching newInterval's start and end.\n3. Add the merged newInterval.\n4. Copy over intervals completely to the right.",
  hints: ["Three linear phases: left non-overlapping, overlapping merge, right non-overlapping", "Overlap condition: current.start <= newInterval.end", "Already sorted, so no sorting needed — O(n) total"],
  interviewNotes: ["Already sorted input means this is O(n), unlike Merge Intervals which requires O(n log n) sort", "Clear three-phase while loop structure is preferred by interviewers", "Works in-place without re-sorting"],
  oneLineAnswer: "Three phases: append intervals before newInterval, merge all overlapping intervals into newInterval, append remaining.",
  edgeCases: ["Empty intervals array: return [newInterval]", "newInterval goes at the very beginning", "newInterval goes at the very end", "newInterval encompasses all existing intervals"],
  similar: [{id: 56, title: "Merge Intervals"}, {id: 452, title: "Minimum Number of Arrows to Burst Balloons"}]
},

// ─── TRIE ───────────────────────────────────────────────────────────────────
{
  id: 14, title: "Longest Common Prefix", topic: "Trie", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
  description: "Write a function to find the longest common prefix string amongst an array of strings. If none, return ''.\n\nExample:\nInput: strs = ['flower','flow','flight']\nOutput: 'fl'",
  intuition: "Horizontal scanning: take the first word as prefix. Shorten it until it matches the start of the next word. Repeat for all words.",
  approach: "1. If strs is empty, return ''.\n2. Set prefix = strs[0].\n3. For each word in strs from index 1:\n   - While word does not start with prefix (indexOf != 0), chop last char off prefix.\n   - If prefix becomes empty, return ''.\n4. Return prefix.",
  javaSolution: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            // Trim prefix until current string starts with it
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
  complexity: { time: "O(S) where S is sum of all characters", space: "O(1)" },
  simpleExplanation: "1. Assume the whole first word is the prefix.\n2. Look at the next word; if it doesn't match, chop one letter off the end of prefix.\n3. Repeat until it matches, then move to the next word.",
  hints: ["Horizontal scanning with indexOf(prefix) == 0", "Shorten prefix by 1 char each time", "Early exit if prefix becomes empty"],
  interviewNotes: ["Horizontal scanning is concise and efficient in practice", "Alternative approaches: vertical scanning, divide-and-conquer, Trie", "Trie is overkill here but good to mention"],
  oneLineAnswer: "Start with first string as prefix; iteratively shorten it from the end until each string starts with it.",
  edgeCases: ["Empty array or single string", "No common prefix: return ''", "Identical strings"],
  similar: [{id: 208, title: "Implement Trie"}]
},
{
  id: 208, title: "Implement Trie (Prefix Tree)", topic: "Trie", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
  description: "Implement a trie with insert, search, and startsWith methods.\n\nExample:\nTrie trie = new Trie();\ntrie.insert('apple');\ntrie.search('apple');   // true\ntrie.search('app');     // false\ntrie.startsWith('app'); // true",
  intuition: "A tree where each node has up to 26 children (one per letter) and an isEnd boolean flag. Traversal follows character edges.",
  approach: "1. TrieNode has TrieNode[26] children and boolean isEnd.\n2. insert(word): traverse character by character, creating nodes as needed. Set isEnd=true at the end.\n3. search(word): traverse; return false if a node is missing. Return isEnd at destination.\n4. startsWith(prefix): same as search, but return true if destination node exists (no isEnd check).",
  javaSolution: `class Trie {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }

    private final Node root = new Node();

    public void insert(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new Node();
            curr = curr.children[idx];
        }
        curr.isEnd = true; // mark end of word
    }

    public boolean search(String word) {
        Node node = find(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private Node find(String prefix) {
        Node curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return null;
            curr = curr.children[idx];
        }
        return curr;
    }
}`,
  complexity: { time: "O(m) for all operations where m is word length", space: "O(total characters inserted * 26)" },
  simpleExplanation: "1. Build a tree where every branch is a letter (a to z).\n2. Inserting walks down the branches, creating new nodes when letters don't exist yet.\n3. search() checks if the word exists AND is marked as an end of word.\n4. startsWith() just checks if the branch path exists.",
  hints: ["Node with children array of size 26 and isEnd boolean", "Extract helper method find(prefix) to share code between search and startsWith", "Time complexity depends only on word length, not dataset size"],
  interviewNotes: ["Trie gives O(m) search independent of the number of words stored", "Array of 26 is faster than HashMap for lowercase English letters", "Extracting find() DRYs up search and startsWith"],
  oneLineAnswer: "Tree where each node holds 26 character child pointers and an isEnd flag; traverse letter by letter in O(m) time.",
  edgeCases: ["Searching for prefix that is not a full word", "Empty string", "Inserting duplicate words"],
  similar: [{id: 211, title: "Design Add and Search Words Data Structure"}, {id: 212, title: "Word Search II"}]
},
{
  id: 211, title: "Design Add and Search Words Data Structure", topic: "Trie", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
  description: "Design a data structure that supports adding new words and searching for a string matching a regex with '.' (where '.' can match any letter).\n\nExample:\nWordDictionary d = new WordDictionary();\nd.addWord('bad');\nd.search('.ad'); // true",
  intuition: "Use a standard Trie. For search, standard characters advance down the matching child. A '.' character triggers backtracking (DFS) over all non-null children at the current node.",
  approach: "1. Standard TrieNode with children[26] and isEnd.\n2. addWord: standard Trie insert.\n3. search(word): recursive DFS helper dfs(node, word, index).\n   - If index == word.length: return node.isEnd.\n   - If word[index] != '.': advance down children[c - 'a'].\n   - If word[index] == '.': loop over all 26 children; if any returns true, return true.",
  javaSolution: `class WordDictionary {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }

    private final Node root = new Node();

    public void addWord(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new Node();
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean search(String word) {
        return dfs(root, word, 0);
    }

    private boolean dfs(Node node, String word, int idx) {
        if (node == null) return false;
        if (idx == word.length()) return node.isEnd;
        char c = word.charAt(idx);
        if (c != '.') {
            return dfs(node.children[c - 'a'], word, idx + 1);
        }
        // Wildcard '.': branch into all existing children
        for (Node child : node.children) {
            if (child != null && dfs(child, word, idx + 1)) return true;
        }
        return false;
    }
}`,
  complexity: { time: "O(m) for add, O(26^m) worst case for search with all dots", space: "O(total characters * 26)" },
  simpleExplanation: "1. Store words in a Trie.\n2. When searching, if you see a normal letter, follow that path.\n3. If you see a '.', try every possible child branch that exists (DFS).\n4. If any branch matches the rest of the word, return true.",
  hints: ["Standard Trie with recursive DFS for search", "'.' branches across all non-null children", "Base case: idx == word.length() check node.isEnd"],
  interviewNotes: ["Trie + Backtracking combination", "Worst case for search occurs when search string is '.....' (checks entire trie)", "Short-circuit on first matching branch during '.' expansion"],
  oneLineAnswer: "Trie with recursive DFS search: regular characters follow the child pointer; '.' branches across all active children.",
  edgeCases: ["Search with multiple consecutive dots '...'", "Word not ending at a valid isEnd", "Single letter words"],
  similar: [{id: 208, title: "Implement Trie"}, {id: 212, title: "Word Search II"}]
},
{
  id: 212, title: "Word Search II", topic: "Trie", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
  description: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from sequentially adjacent cells.\n\nExample:\nInput: board = [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words = ['oath','pea','eat','rain']\nOutput: ['eat','oath']",
  intuition: "Searching each word individually on the board is too slow. Instead, put all words into a Trie, then do a single DFS from every board cell, pruning branches as soon as they diverge from the Trie.",
  approach: "1. Build a Trie from words. Store the full word string at each leaf node (word != null instead of isEnd).\n2. For each cell (r, c), launch DFS.\n3. In DFS: check bounds and if cell visited. Check if board[r][c] matches a child in Trie node.\n4. If match, advance. If node.word != null, add to results and set node.word = null (avoids duplicates).\n5. Mark cell visited (e.g. board[r][c] = '#'), DFS 4 neighbors, then backtrack.",
  javaSolution: `class Solution {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null; // store full word at leaf for O(1) retrieval
    }

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode curr = root;
            for (char c : w.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
                curr = curr.children[idx];
            }
            curr.word = w; // word stored at end
        }

        List<String> res = new ArrayList<>();
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                dfs(board, r, c, root, res);
            }
        }
        return res;
    }

    private void dfs(char[][] board, int r, int c, TrieNode node, List<String> res) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
        char ch = board[r][c];
        if (ch == '#' || node.children[ch - 'a'] == null) return;

        node = node.children[ch - 'a'];
        if (node.word != null) {
            res.add(node.word);
            node.word = null; // avoid duplicate entries in result
        }

        board[r][c] = '#'; // mark visited in-place
        dfs(board, r + 1, c, node, res);
        dfs(board, r - 1, c, node, res);
        dfs(board, r, c + 1, node, res);
        dfs(board, r, c - 1, node, res);
        board[r][c] = ch; // backtrack
    }
}`,
  complexity: { time: "O(m * n * 4^(max_word_len))", space: "O(total characters in words)" },
  simpleExplanation: "1. Put all search words into a Trie.\n2. Store the full word at the leaf of the Trie so you don't have to build strings.\n3. Explore the board with DFS; if the current letter doesn't exist in the Trie, stop immediately.\n4. Mark cells with '#' while visiting, and unmark on the way back.",
  hints: ["Store word string directly at Trie leaf to avoid rebuilding", "Set node.word = null after finding to prevent duplicates", "Mark board[r][c] = '#' for in-place visited tracking"],
  interviewNotes: ["Trie + Backtracking on Grid is a tier-1 interview favorite", "Setting node.word = null deduplicates results without needing a HashSet", "In-place grid marking board[r][c] = '#' avoids extra boolean[][] visited array"],
  oneLineAnswer: "Insert words into a Trie, DFS the board guided by Trie nodes, pruning dead paths instantly; set node.word=null to deduplicate.",
  edgeCases: ["Overlapping words ('oath', 'oat')", "Same word found at multiple locations", "Empty board or empty words list"],
  similar: [{id: 79, title: "Word Search"}, {id: 208, title: "Implement Trie"}]
},
{
  id: 139, title: "Word Break", topic: "Trie", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/word-break/",
  description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.\n\nExample:\nInput: s = 'leetcode', wordDict = ['leet','code']\nOutput: true",
  intuition: "DP: dp[i] = true if s[0..i-1] can be segmented. To check dp[i], see if there is any j < i such that dp[j] is true and s[j..i-1] is in wordDict.",
  approach: "1. Put wordDict into a HashSet for O(1) lookup.\n2. dp = new boolean[n + 1]; dp[0] = true (empty string is valid).\n3. For i from 1 to n:\n   - For j from 0 to i-1:\n     - If dp[j] is true and wordSet.contains(s.substring(j, i)), set dp[i] = true and break.\n4. Return dp[n].",
  javaSolution: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> dict = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true; // empty string base case
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                // If prefix s[0..j-1] is segmentable and s[j..i-1] is a word
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break; // no need to check other splits for i
                }
            }
        }
        return dp[n];
    }
}`,
  complexity: { time: "O(n² * k) where k is average word length for substring", space: "O(n + total characters in dict)" },
  simpleExplanation: "1. Build an array dp where dp[i] means 'can the first i letters be broken into valid words?'.\n2. dp[0] is true.\n3. For each cut at position i, look backwards for a previous valid cut at j.\n4. If the piece between j and i is in the dictionary, then position i is valid.",
  hints: ["1D DP: dp[i] represents s[0..i-1]", "Check all splits j < i where dp[j] is true", "Use HashSet for O(1) word lookup"],
  interviewNotes: ["Classic 1D DP with string slicing", "Optimization: only check j where i - j <= maxWordLength", "Trie can also be used to match prefixes, but HashSet is standard"],
  oneLineAnswer: "1D DP: dp[i] is true if any previous valid prefix dp[j] leaves a suffix s[j..i] that exists in the dictionary.",
  edgeCases: ["Single character matching", "Entire string is one word", "String cannot be segmented"],
  similar: [{id: 140, title: "Word Break II"}, {id: 472, title: "Concatenated Words"}]
},

// ─── SLIDING WINDOW ─────────────────────────────────────────────────────────
{
  id: 209, title: "Minimum Size Subarray Sum", topic: "Sliding Window", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
  description: "Given an array of positive integers nums and a positive target, return the minimal length of a contiguous subarray whose sum is >= target. If none, return 0.\n\nExample:\nInput: target = 7, nums = [2,3,1,2,4,3]\nOutput: 2 ([4,3])",
  intuition: "Variable sliding window: expand right to increase sum until sum >= target. Then contract left to find the minimal valid window while maintaining sum >= target.",
  approach: "1. Pointers l = 0, sum = 0, minLen = infinity.\n2. For r from 0 to n-1: add nums[r] to sum.\n3. While sum >= target: update minLen = min(minLen, r - l + 1), subtract nums[l], l++.\n4. Return minLen == infinity ? 0 : minLen.",
  javaSolution: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int l = 0, sum = 0, minLen = Integer.MAX_VALUE;
        for (int r = 0; r < nums.length; r++) {
            sum += nums[r];
            // Contract window from the left while sum constraint is satisfied
            while (sum >= target) {
                minLen = Math.min(minLen, r - l + 1);
                sum -= nums[l++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`,
  complexity: { time: "O(n) — each element added and removed at most once", space: "O(1)" },
  simpleExplanation: "1. Expand a window to the right, adding numbers to a running sum.\n2. Once the sum hits target, shrink the window from the left to see how small it can get.\n3. Track the smallest valid window length.",
  hints: ["Sliding window with two pointers", "Expand right, shrink left when sum >= target", "All elements positive guarantees monotonicity"],
  interviewNotes: ["Works because all elements are positive (monotonic sum)", "Follow-up: if negative numbers exist, sliding window fails — use prefix sum + monotonic deque", "O(n) amortized: each element visited at most twice"],
  oneLineAnswer: "Expand right to reach target sum, then shrink left to minimize window length while sum >= target.",
  edgeCases: ["No subarray satisfies target: return 0", "Single element >= target: return 1", "Entire array needed"],
  similar: [{id: 76, title: "Minimum Window Substring"}, {id: 3, title: "Longest Substring Without Repeating Characters"}]
},
{
  id: 3, title: "Longest Substring Without Repeating Characters", topic: "Sliding Window", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  description: "Given a string s, find the length of the longest substring without repeating characters.\n\nExample:\nInput: s = 'abcabcbb'\nOutput: 3 ('abc')",
  intuition: "Sliding window with character index map. As right pointer expands, if s[r] was seen inside the current window, jump left pointer to lastSeen[s[r]] + 1 to eliminate the duplicate.",
  approach: "1. Use an int[128] array to store the last seen 1-based index of each ASCII character.\n2. Left pointer l = 0, maxLen = 0.\n3. For r from 0 to s.length()-1: if char was seen, update l = max(l, lastSeen[c]).\n4. Update maxLen = max(maxLen, r - l + 1).\n5. Record lastSeen[c] = r + 1.",
  javaSolution: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] last = new int[128]; // stores last seen 1-based index of each char
        int maxLen = 0, l = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            // Jump left pointer past previous occurrence if inside current window
            l = Math.max(l, last[c]);
            maxLen = Math.max(maxLen, r - l + 1);
            last[c] = r + 1; // 1-based index
        }
        return maxLen;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) — 128-element array" },
  simpleExplanation: "1. Expand a window across the string with pointer r.\n2. Remember where you last saw each character.\n3. If you see a character that's already in the window, jump the left pointer right past its last position.\n4. Track the maximum window size.",
  hints: ["128-element array stores last seen positions", "l = Math.max(l, last[c]) ensures l never moves backward", "1-based indexing avoids -1 initialization"],
  interviewNotes: ["O(1) space with 128-element ASCII array beats HashMap in speed", "Math.max(l, last[c]) is critical so l doesn't jump backwards to a duplicate outside window", "Classic tier-1 FAANG question"],
  oneLineAnswer: "Expand right, jumping left pointer past the last seen position of duplicate characters; track max window length.",
  edgeCases: ["Empty string: return 0", "All identical characters ('bbbbb'): return 1", "String with all unique characters: return n"],
  similar: [{id: 76, title: "Minimum Window Substring"}, {id: 159, title: "Longest Substring with At Most Two Distinct Characters"}]
},
{
  id: 30, title: "Substring with Concatenation of All Words", topic: "Sliding Window", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
  description: "Given a string s and an array of equal-length strings words, return all starting indices of substring(s) in s that are a concatenation of each word in words exactly once.\n\nExample:\nInput: s = 'barfoothefoobarman', words = ['foo','bar']\nOutput: [0,9]",
  intuition: "All words have the same length wordLen. We can run wordLen independent sliding windows, each stepping by wordLen chunks. Track word frequency in the current window and match against target counts.",
  approach: "1. Build count map of words. Let k = words.length, len = words[0].length().\n2. For offset from 0 to len-1:\n   - Slide a window stepping by len.\n   - If a word is valid, increment its count in window. If count exceeds target, shrink left by len until valid.\n   - If window size equals k * len, record left start index.\n3. Return all matched indices.",
  javaSolution: `class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> res = new ArrayList<>();
        if (s.isEmpty() || words.length == 0) return res;
        int wordLen = words[0].length(), numWords = words.length;
        int totalLen = wordLen * numWords;
        Map<String, Integer> target = new HashMap<>();
        for (String w : words) target.put(w, target.getOrDefault(w, 0) + 1);

        // Run wordLen independent sliding windows
        for (int i = 0; i < wordLen; i++) {
            int l = i, count = 0;
            Map<String, Integer> seen = new HashMap<>();
            for (int r = i; r + wordLen <= s.length(); r += wordLen) {
                String sub = s.substring(r, r + wordLen);
                if (target.containsKey(sub)) {
                    seen.put(sub, seen.getOrDefault(sub, 0) + 1);
                    count++;
                    // If word occurs too many times, shrink left
                    while (seen.get(sub) > target.get(sub)) {
                        String leftWord = s.substring(l, l + wordLen);
                        seen.put(leftWord, seen.get(leftWord) - 1);
                        count--;
                        l += wordLen;
                    }
                    if (count == numWords) res.add(l);
                } else {
                    seen.clear();
                    count = 0;
                    l = r + wordLen;
                }
            }
        }
        return res;
    }
}`,
  complexity: { time: "O(n * wordLen)", space: "O(numWords * wordLen)" },
  simpleExplanation: "1. All words have equal length L.\n2. Run L separate sliding windows that jump L characters at a time.\n3. Track words in the current window using a map.\n4. When word counts match the target word list, record the start index.",
  hints: ["All words have equal length L — use this!", "Run L sliding windows with step size L", "Shrink left when a word count exceeds expected"],
  interviewNotes: ["Running L sliding windows of step L is the O(n) key; brute force substring checking is O(n * k * L)", "Handle duplicate words in words array using count maps", "Clear window state on invalid word"],
  oneLineAnswer: "Run wordLen parallel sliding windows stepping by wordLen chunks, matching word frequency counts in O(n).",
  edgeCases: ["Duplicate words in dictionary", "s shorter than total concatenation length", "No valid matches"],
  similar: [{id: 76, title: "Minimum Window Substring"}, {id: 438, title: "Find All Anagrams in a String"}]
},
{
  id: 76, title: "Minimum Window Substring", topic: "Sliding Window", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
  description: "Given two strings s and t, return the minimum window substring of s that contains every character in t (including duplicates). If none, return ''.\n\nExample:\nInput: s = 'ADOBECODEBANC', t = 'ABC'\nOutput: 'BANC'",
  intuition: "Sliding window with frequency map. Expand right until all characters of t are satisfied. Then shrink left to minimize window while keeping it valid. Track the smallest valid window.",
  approach: "1. Build count array of characters in t. Track remaining required chars.\n2. Expand right pointer r: if s[r] was needed (count > 0), decrement required. Decrement count[s[r]].\n3. While required == 0 (window valid):\n   - Update minLen and bestStart.\n   - If count[s[l]] == 0, increment required (losing needed char).\n   - Increment count[s[l]], l++.\n4. Return substring from bestStart of length minLen.",
  javaSolution: `class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        int[] need = new int[128];
        for (char c : t.toCharArray()) need[c]++;
        int required = t.length();
        int l = 0, minLen = Integer.MAX_VALUE, start = 0;

        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (need[c] > 0) required--; // char was needed
            need[c]--; // can go negative (extra chars in window)

            // When all characters are satisfied, contract from left
            while (required == 0) {
                if (r - l + 1 < minLen) {
                    minLen = r - l + 1;
                    start = l;
                }
                need[s.charAt(l)]++;
                if (need[s.charAt(l)] > 0) required++; // lost a necessary char
                l++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}`,
  complexity: { time: "O(n + m)", space: "O(1) — 128-element array" },
  simpleExplanation: "1. Count what letters you need from t.\n2. Expand right until your window contains every letter from t.\n3. Then shrink from the left to find the tightest window that still has all letters.\n4. Repeat and keep the smallest window found.",
  hints: ["128-element ASCII array for character counts", "required counter tracks how many characters still need satisfaction", "need[c] can go negative to track excess characters"],
  interviewNotes: ["Allowing need[c] to go negative neatly tracks surplus characters without extra sets", "O(1) space with 128-int array", "The gold standard sliding window interview problem"],
  oneLineAnswer: "Expand right until all target characters are matched, then shrink left to minimize window; track global smallest.",
  edgeCases: ["s shorter than t: return ''", "t has duplicate characters ('AABC')", "Entire s is required"],
  similar: [{id: 3, title: "Longest Substring Without Repeating Characters"}, {id: 209, title: "Minimum Size Subarray Sum"}]
},
{
  id: 219, title: "Contains Duplicate II", topic: "Sliding Window", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/contains-duplicate-ii/",
  description: "Given an integer array nums and an integer k, return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i - j) <= k.\n\nExample:\nInput: nums = [1,2,3,1], k = 3\nOutput: true",
  intuition: "Maintain a sliding window of size at most k using a HashSet. If adding an element fails (already present), return true. When window exceeds size k, remove the oldest element.",
  approach: "1. Use a HashSet to hold elements in the current window of size k.\n2. For each index i and value nums[i]:\n   - If i > k, remove nums[i - k - 1] from set.\n   - If !set.add(nums[i]), duplicate found within distance k — return true.\n3. Return false if no duplicate found.",
  javaSolution: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Set<Integer> window = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            // Keep window size at most k by evicting oldest element
            if (i > k) window.remove(nums[i - k - 1]);
            if (!window.add(nums[i])) return true; // duplicate in window
        }
        return false;
    }
}`,
  complexity: { time: "O(n)", space: "O(min(n, k))" },
  simpleExplanation: "1. Look at numbers in a sliding window of width k.\n2. Use a Set to track numbers in the window.\n3. If a number is already in the set, we found a duplicate within distance k.\n4. When the window slides past k, drop the oldest number.",
  hints: ["HashSet bounded to size k", "set.add() returns false if element already exists", "Evict nums[i - k - 1] when i > k"],
  interviewNotes: ["set.add() returning false provides a concise existence check and insertion in one call", "Space complexity is bounded by min(n, k)", "Alternative: HashMap storing last seen indices"],
  oneLineAnswer: "Maintain a HashSet of size at most k; if set.add() returns false, a duplicate exists within distance k.",
  edgeCases: ["k >= n: window covers whole array", "k = 0: always false (indices must be distinct)", "No duplicates"],
  similar: [{id: 217, title: "Contains Duplicate"}, {id: 220, title: "Contains Duplicate III"}]
}
];

