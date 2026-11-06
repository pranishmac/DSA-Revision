// Part 1: Two Pointers (14) + Sorting (5) + Dynamic Programming (9) + Greedy (6) = 34 questions
const QUESTIONS_PART1 = [
// ─── TWO POINTERS ───────────────────────────────────────────────────────────
{
  id: 88, title: "Merge Sorted Array", topic: "Two Pointers", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/merge-sorted-array/",
  description: "You are given two sorted integer arrays nums1 and nums2. Merge nums2 into nums1 as one sorted array. nums1 has extra zeros at the end to hold nums2's elements.\n\nExample:\nInput: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]",
  intuition: "Start filling from the END of nums1. Compare the largest unplaced elements from both arrays and place the bigger one at the back. This avoids overwriting nums1 elements that haven't been placed yet.",
  approach: "1. Use three pointers: p1 = m-1 (end of nums1 data), p2 = n-1 (end of nums2), p = m+n-1 (end of merged array).\n2. While both pointers are valid, compare nums1[p1] and nums2[p2].\n3. Place the larger at nums1[p] and decrement that pointer and p.\n4. If nums2 elements remain, copy them (nums1 elements are already in place).",
  javaSolution: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        // Fill from the back to avoid overwriting unconsumed nums1 elements
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
            else nums1[p--] = nums2[p2--];
        }
        // Copy leftover nums2 elements (nums1 leftovers are already in place)
        while (p2 >= 0) nums1[p--] = nums2[p2--];
    }
}`,
  complexity: { time: "O(m+n)", space: "O(1)" },
  simpleExplanation: "1. Point to the end of both arrays.\n2. Keep picking the larger element and placing it at the back of nums1.\n3. Any remaining nums2 elements get copied over.",
  hints: ["Fill from the back", "Three-pointer technique", "No extra space needed"],
  interviewNotes: ["Filling from the back avoids overwriting elements we still need", "If p2 runs out first, nums1 elements are already in correct positions", "O(1) space — in-place merge"],
  oneLineAnswer: "Use three pointers starting from the end: compare largest elements and place them at the back of nums1.",
  edgeCases: ["m=0: just copy nums2", "n=0: nums1 unchanged", "All nums2 elements larger than nums1"],
  similar: [{id: 21, title: "Merge Two Sorted Lists"}, {id: 23, title: "Merge k Sorted Lists"}]
},
{
  id: 27, title: "Remove Element", topic: "Two Pointers", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/remove-element/",
  description: "Given an integer array nums and a value val, remove all occurrences of val in-place. Return the count k of elements not equal to val. The first k elements of nums should hold the result.\n\nExample:\nInput: nums = [3,2,2,3], val = 3\nOutput: 2, nums = [2,2,_,_]",
  intuition: "Use a write pointer that only advances when we find a valid (non-val) element. This overwrites elements equal to val with valid ones.",
  approach: "1. Keep a write pointer k = 0.\n2. For each element in nums, if it's not equal to val, write it at nums[k] and increment k.\n3. Return k.",
  javaSolution: `class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0; // write pointer
        for (int x : nums) {
            if (x != val) nums[k++] = x; // keep non-val elements
        }
        return k;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Walk through the array.\n2. Only copy elements that are NOT val to the front.\n3. Return the count of kept elements.",
  hints: ["Write pointer pattern", "Skip elements equal to val", "Single pass"],
  interviewNotes: ["Classic write-pointer (slow-fast pointer) pattern", "Order of remaining elements doesn't matter per problem statement", "Same idea as partition in quicksort"],
  oneLineAnswer: "Use a write pointer k; copy every element != val to nums[k++] and return k.",
  edgeCases: ["All elements equal val → return 0", "No elements equal val → return n", "Empty array"],
  similar: [{id: 26, title: "Remove Duplicates from Sorted Array"}, {id: 283, title: "Move Zeroes"}]
},
{
  id: 26, title: "Remove Duplicates from Sorted Array", topic: "Two Pointers", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
  description: "Given a sorted array nums, remove duplicates in-place so each element appears only once. Return the count k of unique elements.\n\nExample:\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2,_]",
  intuition: "Since the array is sorted, duplicates are adjacent. Keep a write pointer that only advances when we see a new unique element.",
  approach: "1. Write pointer k = 1 (first element is always unique).\n2. For each element from index 1 onwards, if nums[i] != nums[k-1], it's a new unique — write it at nums[k++].\n3. Return k.",
  javaSolution: `class Solution {
    public int removeDuplicates(int[] nums) {
        int k = 1; // first element is always unique
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[k - 1]) // new unique element found
                nums[k++] = nums[i];
        }
        return k;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. First element is always kept.\n2. For each next element, check if it differs from the last kept element.\n3. If yes, keep it; otherwise skip.",
  hints: ["Sorted array → duplicates adjacent", "Compare with last placed element", "Write pointer k starts at 1"],
  interviewNotes: ["Works because array is sorted — duplicates cluster together", "Compare nums[i] with nums[k-1] not nums[i-1]", "Return k not the modified array"],
  oneLineAnswer: "Write pointer k: copy nums[i] to nums[k] only when nums[i] != nums[k-1], ensuring each value appears once.",
  edgeCases: ["Single element", "All duplicates → return 1", "No duplicates → return n"],
  similar: [{id: 80, title: "Remove Duplicates from Sorted Array II"}, {id: 27, title: "Remove Element"}]
},
{
  id: 80, title: "Remove Duplicates from Sorted Array II", topic: "Two Pointers", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
  description: "Given a sorted array, remove duplicates such that each element appears at most twice. Return the count k of valid elements.\n\nExample:\nInput: nums = [1,1,1,2,2,3]\nOutput: 5, nums = [1,1,2,2,3,_]",
  intuition: "Allow at most 2 copies. Compare current element with the element placed 2 positions back (nums[k-2]). If they differ, we can safely place the current element.",
  approach: "1. Write pointer k = 2 (first two elements always valid).\n2. For i from 2 to n-1: if nums[i] != nums[k-2], place nums[i] at nums[k++].\n3. Return k.",
  javaSolution: `class Solution {
    public int removeDuplicates(int[] nums) {
        int k = 2; // first two elements always valid
        for (int i = 2; i < nums.length; i++) {
            // Allow element if it differs from the one placed 2 spots back
            if (nums[i] != nums[k - 2])
                nums[k++] = nums[i];
        }
        return k;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Keep the first 2 elements always.\n2. For remaining elements, only keep them if they differ from what was placed 2 slots ago.\n3. This ensures at most 2 copies of any value.",
  hints: ["Compare with nums[k-2] not nums[k-1]", "Generalize: for at most k allowed, compare with nums[write-k]", "Single pass"],
  interviewNotes: ["Generalizes elegantly: for 'at most k duplicates', compare with nums[write-k]", "k=1 gives the previous problem (at most 1 duplicate)", "Same pattern works for any allowed count"],
  oneLineAnswer: "Compare each element with nums[k-2]; if different, place it — this guarantees at most 2 occurrences.",
  edgeCases: ["Array length <= 2: return as-is", "All same elements: keep only first 2", "No duplicates: return n"],
  similar: [{id: 26, title: "Remove Duplicates from Sorted Array"}, {id: 27, title: "Remove Element"}]
},
{
  id: 189, title: "Rotate Array", topic: "Two Pointers", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/rotate-array/",
  description: "Given an integer array nums, rotate it to the right by k steps.\n\nExample:\nInput: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]",
  intuition: "Three reverses trick: reverse the whole array, then reverse first k elements, then reverse remaining. This achieves rotation without extra space.",
  approach: "1. Normalize k = k % n (k could be >= n).\n2. Reverse entire array.\n3. Reverse first k elements.\n4. Reverse elements from k to end.",
  javaSolution: `class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n; // handle k >= n
        reverse(nums, 0, n - 1); // reverse all
        reverse(nums, 0, k - 1); // reverse first k
        reverse(nums, k, n - 1); // reverse rest
    }

    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int tmp = nums[l]; nums[l++] = nums[r]; nums[r--] = tmp;
        }
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Flip the whole array.\n2. Flip only the first k elements.\n3. Flip the rest.\n4. This magically gives the rotated result.",
  hints: ["Three reversal trick", "k %= n first", "O(1) space solution"],
  interviewNotes: ["Three-reversal is the optimal O(1) space approach", "Always normalize k % n first", "Alternative: extra array O(n) space — mention but prefer this"],
  oneLineAnswer: "Reverse all, reverse first k, reverse last n-k — three reverses achieves rotation in O(1) space.",
  edgeCases: ["k=0 or k=n: no change", "k > n: use k%n", "Single element"],
  similar: [{id: 61, title: "Rotate List"}, {id: 48, title: "Rotate Image"}]
},
{
  id: 151, title: "Reverse Words in a String", topic: "Two Pointers", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/reverse-words-in-a-string/",
  description: "Given a string s, reverse the order of words. Words are separated by spaces. Remove leading/trailing spaces and reduce multiple spaces to single space.\n\nExample:\nInput: s = '  hello world  '\nOutput: 'world hello'",
  intuition: "Split on whitespace (which handles multiple spaces), filter empty strings, reverse the list, then join with single space.",
  approach: "1. Split the string by spaces using trim() and split on regex '\\\\s+'.\n2. This handles multiple spaces automatically.\n3. Reverse the resulting array.\n4. Join with a single space.",
  javaSolution: `class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+"); // split on any whitespace runs
        int l = 0, r = words.length - 1;
        while (l < r) {
            String tmp = words[l]; words[l++] = words[r]; words[r--] = tmp;
        }
        return String.join(" ", words);
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. trim() removes leading/trailing spaces.\n2. split('\\\\s+') splits on any run of whitespace.\n3. Reverse the word array.\n4. Join with single space.",
  hints: ["Use trim() + split('\\\\s+') to handle multiple spaces", "Then reverse word array", "String.join for output"],
  interviewNotes: ["\\\\s+ matches one or more whitespace characters", "In-place reversal possible if using char array (follow-up)", "trim() is essential to avoid empty strings at ends"],
  oneLineAnswer: "Trim, split on \\\\s+, reverse word array, join with single space.",
  edgeCases: ["Single word", "Multiple spaces between words", "Only spaces → empty words array issue (trim() fixes this)"],
  similar: [{id: 186, title: "Reverse Words in a String II"}, {id: 557, title: "Reverse Words in a String III"}]
},
{
  id: 28, title: "Find the Index of the First Occurrence in a String", topic: "Two Pointers", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
  description: "Given strings haystack and needle, return the index of needle's first occurrence in haystack, or -1 if not found.\n\nExample:\nInput: haystack = 'sadbutsad', needle = 'sad'\nOutput: 0",
  intuition: "Slide a window of needle's length across haystack and check for a match at each position. Java's built-in indexOf does this, or implement manually.",
  approach: "1. For each start index i from 0 to len(haystack)-len(needle).\n2. Check if haystack.substring(i, i+needle.length()) equals needle.\n3. Return i if match found; else return -1.",
  javaSolution: `class Solution {
    public int strStr(String haystack, String needle) {
        int h = haystack.length(), n = needle.length();
        for (int i = 0; i <= h - n; i++) {
            // Check substring starting at i
            if (haystack.substring(i, i + n).equals(needle)) return i;
        }
        return -1;
    }
}`,
  complexity: { time: "O(h*n)", space: "O(1)" },
  simpleExplanation: "1. Try every possible starting position.\n2. At each position, check if the next n characters match needle.\n3. Return the first match position.",
  hints: ["Sliding window of size needle.length()", "Stop at h - n (not h)", "KMP is O(n) but substring approach is fine for interviews"],
  interviewNotes: ["Mention KMP algorithm as O(n+m) optimal solution", "Built-in indexOf is acceptable in Java", "Be careful with the loop boundary: i <= h - n"],
  oneLineAnswer: "Slide a window of needle's length across haystack, checking each substring — return index of first match.",
  edgeCases: ["needle is empty string → return 0", "needle longer than haystack → return -1", "needle at the very end"],
  similar: [{id: 214, title: "Shortest Palindrome"}, {id: 459, title: "Repeated Substring Pattern"}]
},
{
  id: 125, title: "Valid Palindrome", topic: "Two Pointers", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
  description: "A phrase is a palindrome if, after converting to lowercase and removing non-alphanumeric characters, it reads the same forward and backward.\n\nExample:\nInput: s = 'A man, a plan, a canal: Panama'\nOutput: true",
  intuition: "Use two pointers from both ends. Skip non-alphanumeric characters and compare the remaining characters case-insensitively.",
  approach: "1. Left pointer at start, right pointer at end.\n2. Skip non-alphanumeric chars from both sides.\n3. Compare characters (case-insensitive) — if mismatch, return false.\n4. Move both pointers inward. Return true if no mismatch.",
  javaSolution: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            // Skip non-alphanumeric from left
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            // Skip non-alphanumeric from right
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
                return false;
            l++; r--;
        }
        return true;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Two pointers from each end.\n2. Skip punctuation and spaces on both sides.\n3. Compare letters/digits case-insensitively.\n4. Any mismatch means not a palindrome.",
  hints: ["Character.isLetterOrDigit() to filter", "Character.toLowerCase() for case-insensitive compare", "Two pointers from both ends"],
  interviewNotes: ["Character.isLetterOrDigit() is cleaner than regex", "O(1) space — no need to build a new string", "Inner while loops handle consecutive non-alphanumeric chars"],
  oneLineAnswer: "Two pointers from both ends, skip non-alphanumeric chars, compare case-insensitively.",
  edgeCases: ["Empty string is palindrome", "Only special characters → empty after filter → palindrome", "Single character"],
  similar: [{id: 234, title: "Palindrome Linked List"}, {id: 5, title: "Longest Palindromic Substring"}]
},
{
  id: 392, title: "Is Subsequence", topic: "Two Pointers", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/is-subsequence/",
  description: "Given strings s and t, return true if s is a subsequence of t (characters of s appear in t in order, not necessarily contiguous).\n\nExample:\nInput: s = 'abc', t = 'ahbgdc'\nOutput: true",
  intuition: "Walk through t with a pointer on s. Each time we find a character matching s[i], advance i. If i reaches s.length(), s is a subsequence.",
  approach: "1. Pointer i on s = 0.\n2. For each character in t, if t[j] == s[i], advance i.\n3. If i reaches s.length(), return true.\n4. If t exhausted and i < s.length(), return false.",
  javaSolution: `class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0;
        for (int j = 0; j < t.length() && i < s.length(); j++) {
            if (s.charAt(i) == t.charAt(j)) i++; // matched one character of s
        }
        return i == s.length(); // all of s was matched
    }
}`,
  complexity: { time: "O(n) where n=|t|", space: "O(1)" },
  simpleExplanation: "1. Walk through t.\n2. Whenever we see the next character of s, tick it off.\n3. If all of s is ticked off, it's a subsequence.",
  hints: ["One pointer on s, one on t", "Only advance s-pointer on a match", "Return i == s.length()"],
  interviewNotes: ["Follow-up: if many s strings to check against same t, use binary search on preprocessed positions", "O(n) single pass is optimal for one query", "Classic two-pointer greedy approach"],
  oneLineAnswer: "Walk t with pointer i on s; advance i on each match — return true if i reaches s.length().",
  edgeCases: ["s is empty → true", "t is empty and s non-empty → false", "s longer than t → false"],
  similar: [{id: 792, title: "Number of Matching Subsequences"}, {id: 115, title: "Distinct Subsequences"}]
},
{
  id: 167, title: "Two Sum II - Input Array Is Sorted", topic: "Two Pointers", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
  description: "Given a 1-indexed sorted array, find two numbers that add up to target. Return their 1-based indices. Exactly one solution exists.\n\nExample:\nInput: numbers = [2,7,11,15], target = 9\nOutput: [1,2]",
  intuition: "Use two pointers from both ends. If sum too big, move right pointer left. If sum too small, move left pointer right. The sorted order guarantees convergence.",
  approach: "1. Left pointer at index 0, right pointer at end.\n2. Compute sum = numbers[l] + numbers[r].\n3. If sum == target, return [l+1, r+1].\n4. If sum < target, l++. If sum > target, r--.",
  javaSolution: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int l = 0, r = numbers.length - 1;
        while (l < r) {
            int sum = numbers[l] + numbers[r];
            if (sum == target) return new int[]{l + 1, r + 1}; // 1-indexed
            else if (sum < target) l++; // need larger sum
            else r--;                   // need smaller sum
        }
        return new int[]{-1, -1}; // guaranteed to have a solution
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Start from both ends.\n2. If the two numbers add up to target, done.\n3. Too small? Move left pointer right (increase sum).\n4. Too big? Move right pointer left (decrease sum).",
  hints: ["Sorted array → two pointers from both ends", "Adjust based on whether sum is too big or small", "One solution guaranteed"],
  interviewNotes: ["Only works because array is sorted", "O(1) space vs O(n) hash map — this is better for sorted input", "Contrast with unsorted Two Sum (use hash map)"],
  oneLineAnswer: "Two pointers from both ends: if sum too small move left up, if too large move right down.",
  edgeCases: ["Exactly one solution guaranteed", "Numbers can be negative", "Same value at both pointers"],
  similar: [{id: 1, title: "Two Sum"}, {id: 15, title: "3Sum"}, {id: 11, title: "Container With Most Water"}]
},
{
  id: 11, title: "Container With Most Water", topic: "Two Pointers", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
  description: "Given n vertical lines at positions 1..n with heights height[i], find two lines that form a container holding the most water.\n\nExample:\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
  intuition: "Start with widest possible container (l=0, r=n-1). Moving the shorter side inward might find a taller side that compensates for reduced width — always move the shorter side.",
  approach: "1. Left and right pointers at both ends.\n2. Calculate area = min(height[l], height[r]) * (r - l).\n3. Update max area.\n4. Move the pointer pointing to the shorter line inward.\n5. Repeat until pointers meet.",
  javaSolution: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1, maxWater = 0;
        while (l < r) {
            int water = Math.min(height[l], height[r]) * (r - l);
            maxWater = Math.max(maxWater, water);
            // Moving the taller side can only decrease width, never increase min height
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxWater;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Start with the widest container.\n2. The water level is limited by the shorter side.\n3. Move the shorter side inward hoping to find a taller one.\n4. Track the maximum area seen.",
  hints: ["Always move the shorter wall", "Moving taller wall never improves — width decreases and height stays same or worse", "Greedy choice is correct here"],
  interviewNotes: ["Key insight: moving the taller side can never increase area (width decreases, height bounded by shorter)", "Moving the shorter side might find a taller wall that compensates", "Greedy + two pointers = O(n)"],
  oneLineAnswer: "Two pointers from both ends; always move the shorter side inward and track max area.",
  edgeCases: ["All equal heights", "Strictly increasing heights", "Only 2 lines"],
  similar: [{id: 42, title: "Trapping Rain Water"}, {id: 84, title: "Largest Rectangle in Histogram"}]
},
{
  id: 15, title: "3Sum", topic: "Two Pointers", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/3sum/",
  description: "Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] where i≠j≠k and nums[i]+nums[j]+nums[k]==0. No duplicate triplets.\n\nExample:\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
  intuition: "Sort the array. For each element nums[i], use two pointers on the rest to find pairs summing to -nums[i]. Skip duplicates to avoid repeated triplets.",
  approach: "1. Sort nums.\n2. For each i from 0 to n-3:\n   - Skip if nums[i] == nums[i-1] (duplicate).\n   - Two pointers l=i+1, r=n-1 looking for sum = -nums[i].\n   - Skip duplicate l and r values after finding a triplet.\n3. Collect all valid triplets.",
  javaSolution: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // skip duplicate i
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++; // skip dup l
                    while (l < r && nums[r] == nums[r - 1]) r--; // skip dup r
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
}`,
  complexity: { time: "O(n²)", space: "O(1) excluding output" },
  simpleExplanation: "1. Sort the array.\n2. Fix one number, use two pointers for the other two.\n3. Skip duplicate values to avoid repeated triplets.\n4. Adjust pointers based on whether sum is too big or small.",
  hints: ["Sort first to enable two pointers and duplicate skipping", "Fix i, two-pointer for l and r", "Skip duplicates at all three positions"],
  interviewNotes: ["Sorting is O(n log n) but nested loop is O(n²) which dominates", "Must skip duplicates at i, l, and r", "Inner while loops for skipping must have bounds check l < r"],
  oneLineAnswer: "Sort, then for each nums[i] use two pointers on the rest to find pairs summing to -nums[i], skipping duplicates.",
  edgeCases: ["No triplets → empty list", "All zeros: [0,0,0]", "All positive or all negative numbers"],
  similar: [{id: 167, title: "Two Sum II"}, {id: 18, title: "4Sum"}, {id: 16, title: "3Sum Closest"}]
},
{
  id: 202, title: "Happy Number", topic: "Two Pointers", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/happy-number/",
  description: "A number is 'happy' if repeatedly replacing it with the sum of squares of its digits eventually reaches 1. If it loops forever, it's not happy.\n\nExample:\nInput: n = 19\nOutput: true (19→82→68→100→1)",
  intuition: "Use Floyd's cycle detection (slow/fast pointers) on the sequence of transformations. If we reach 1, it's happy. If slow meets fast (cycle), it's not.",
  approach: "1. Define getNext(n) = sum of squares of digits.\n2. Slow pointer does one step, fast does two.\n3. If fast == 1, happy. If slow == fast (cycle), not happy.",
  javaSolution: `class Solution {
    public boolean isHappy(int n) {
        int slow = n, fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);        // one step
            fast = getNext(getNext(fast)); // two steps
        }
        return fast == 1;
    }

    private int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10; // extract last digit
            sum += d * d;
            n /= 10;
        }
        return sum;
    }
}`,
  complexity: { time: "O(log n)", space: "O(1)" },
  simpleExplanation: "1. Fast pointer moves 2 steps, slow moves 1 step.\n2. If fast reaches 1, it's a happy number.\n3. If fast and slow meet (cycle detected), it's not happy.",
  hints: ["Floyd's cycle detection applies here", "Unhappy numbers always cycle through the same set", "getNext extracts and squares each digit"],
  interviewNotes: ["Classic Floyd's cycle detection applied to a sequence", "Alternative: HashSet to detect repeated numbers (O(log n) space)", "All unhappy numbers eventually cycle through 4→16→37→58→89→145→42→20→4"],
  oneLineAnswer: "Floyd's cycle detection on digit-square-sum sequence: reach 1 = happy, detect cycle = not happy.",
  edgeCases: ["n=1: immediately happy", "n=4: enters known unhappy cycle"],
  similar: [{id: 141, title: "Linked List Cycle"}, {id: 258, title: "Add Digits"}]
},
{
  id: 5, title: "Longest Palindromic Substring", topic: "Two Pointers", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
  description: "Given a string s, return the longest palindromic substring.\n\nExample:\nInput: s = 'babad'\nOutput: 'bab' (or 'aba')",
  intuition: "Expand around every possible center. Each character (and each gap between characters) can be the center of a palindrome. Track the longest expansion found.",
  approach: "1. For each index i, expand around it as center for both odd-length (center = i) and even-length (center = i, i+1) palindromes.\n2. Keep expanding while characters match.\n3. Track the start and length of the longest palindrome found.",
  javaSolution: `class Solution {
    private int start = 0, maxLen = 1;

    public String longestPalindrome(String s) {
        if (s.length() < 2) return s;
        for (int i = 0; i < s.length() - 1; i++) {
            expand(s, i, i);     // odd-length palindrome
            expand(s, i, i + 1); // even-length palindrome
        }
        return s.substring(start, start + maxLen);
    }

    private void expand(String s, int l, int r) {
        // Expand outward while characters match
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            l--; r++;
        }
        // After loop, l and r are one step beyond the palindrome boundary
        if (r - l - 1 > maxLen) {
            maxLen = r - l - 1;
            start = l + 1;
        }
    }
}`,
  complexity: { time: "O(n²)", space: "O(1)" },
  simpleExplanation: "1. Try every character (and every pair) as a palindrome center.\n2. Expand outward while left and right characters match.\n3. Track the longest palindrome found.",
  hints: ["Expand-around-center technique", "Handle odd and even length palindromes separately", "Manacher's algorithm is O(n) but overkill for interviews"],
  interviewNotes: ["Expand-around-center: O(n²) time, O(1) space — good interview answer", "Manacher's is O(n) but complex — mention it as optimal", "2n-1 possible centers (n odd + n-1 even)"],
  oneLineAnswer: "Expand around each center (and each pair) outward while characters match; track the longest expansion.",
  edgeCases: ["Single character", "All same characters", "No palindrome longer than 1"],
  similar: [{id: 647, title: "Palindromic Substrings"}, {id: 125, title: "Valid Palindrome"}]
},

// ─── SORTING ────────────────────────────────────────────────────────────────
{
  id: 169, title: "Majority Element", topic: "Sorting", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/majority-element/",
  description: "Given an array of size n, find the majority element (appears more than n/2 times). It is guaranteed to always exist.\n\nExample:\nInput: nums = [3,2,3]\nOutput: 3",
  intuition: "Boyer-Moore Voting Algorithm: maintain a candidate and a count. Count cancels out non-candidates. The surviving candidate is the majority element.",
  approach: "1. candidate = nums[0], count = 1.\n2. For each next element: if count == 0, set new candidate.\n3. If element == candidate, count++; else count--.\n4. Return candidate (guaranteed to be majority).",
  javaSolution: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0], count = 1;
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) candidate = nums[i]; // reset candidate
            count += (nums[i] == candidate) ? 1 : -1;
        }
        return candidate; // guaranteed majority exists
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Pick a candidate.\n2. For every matching element, add 1; for non-matching, subtract 1.\n3. When count hits 0, switch to new candidate.\n4. The majority element always survives this process.",
  hints: ["Boyer-Moore Voting Algorithm", "Majority element > n/2 so it can't be fully cancelled", "O(1) space — no hash map needed"],
  interviewNotes: ["Boyer-Moore Voting is the elegant O(n)/O(1) solution", "Only works when majority is guaranteed (>n/2)", "Alternative: sort and return middle element O(n log n)"],
  oneLineAnswer: "Boyer-Moore Voting: track candidate and count; majority element always survives all cancellations.",
  edgeCases: ["Single element", "All same elements", "Majority at the very end"],
  similar: [{id: 229, title: "Majority Element II"}, {id: 1150, title: "Check If a Number Is Majority Element"}]
},
{
  id: 274, title: "H-Index", topic: "Sorting", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/h-index/",
  description: "Given an array of citation counts, return the h-index: the maximum h such that the researcher has h papers with at least h citations each.\n\nExample:\nInput: citations = [3,0,6,1,5]\nOutput: 3",
  intuition: "Sort citations in descending order. The h-index is the largest i+1 where citations[i] >= i+1. As soon as citations[i] < i+1, we've passed the optimal h.",
  approach: "1. Sort citations in descending order.\n2. For each index i, check if citations[i] >= i+1.\n3. If yes, h = i+1 is achievable. Keep going.\n4. Return the largest h found.",
  javaSolution: `class Solution {
    public int hIndex(int[] citations) {
        Arrays.sort(citations);
        int n = citations.length, h = 0;
        for (int i = 0; i < n; i++) {
            // n - i papers have at least citations[i] citations
            if (citations[i] >= n - i) {
                h = n - i; // found h papers with >= h citations
                break;
            }
        }
        return h;
    }
}`,
  complexity: { time: "O(n log n)", space: "O(1)" },
  simpleExplanation: "1. Sort citations ascending.\n2. From the right, n-i papers have at least citations[i] cites.\n3. When citations[i] >= n-i, we found h = n-i.\n4. Return it.",
  hints: ["Sort ascending; iterate from right side", "n-i papers have at least citations[i] citations", "Could also use counting sort for O(n)"],
  interviewNotes: ["After sorting descending: h = max i+1 where citations[i] >= i+1", "Counting sort gives O(n) solution", "h-index can't exceed n (total papers)"],
  oneLineAnswer: "Sort descending; return the largest i+1 where citations[i] >= i+1.",
  edgeCases: ["All zeros → h=0", "All very high citations → h=n", "Single paper"],
  similar: [{id: 275, title: "H-Index II"}]
},
{
  id: 242, title: "Valid Anagram", topic: "Sorting", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
  description: "Given two strings s and t, return true if t is an anagram of s (same characters in any order).\n\nExample:\nInput: s = 'anagram', t = 'nagaram'\nOutput: true",
  intuition: "Two strings are anagrams if they have the exact same character frequencies. Count characters in both and compare, or sort both and compare.",
  approach: "1. If lengths differ, return false.\n2. Count character frequencies in s using a 26-element array.\n3. Decrement for characters in t.\n4. If any count is non-zero, not an anagram.",
  javaSolution: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) count[c - 'a']--;
        for (int x : count) if (x != 0) return false;
        return true;
    }
}`,
  complexity: { time: "O(n)", space: "O(1) — fixed 26-char array" },
  simpleExplanation: "1. Count how many times each letter appears in s.\n2. Subtract counts for each letter in t.\n3. If any count is non-zero, letters don't match up.",
  hints: ["26-character frequency array", "Increment for s, decrement for t", "Unicode follow-up: use HashMap"],
  interviewNotes: ["Follow-up: Unicode characters → use HashMap instead of fixed array", "Sorting approach: O(n log n) — simpler but slower", "Length check is a quick early exit"],
  oneLineAnswer: "Count character frequencies in s, subtract t's; if all zeros, it's an anagram.",
  edgeCases: ["Different lengths → false", "Single characters", "Unicode characters (use HashMap)"],
  similar: [{id: 49, title: "Group Anagrams"}, {id: 438, title: "Find All Anagrams in a String"}]
},
{
  id: 49, title: "Group Anagrams", topic: "Sorting", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
  description: "Given an array of strings, group anagrams together. Return groups in any order.\n\nExample:\nInput: strs = ['eat','tea','tan','ate','nat','bat']\nOutput: [['bat'],['nat','tan'],['ate','eat','tea']]",
  intuition: "Anagrams have the same sorted string. Use sorted version as a HashMap key to group words with identical letter compositions.",
  approach: "1. For each string, sort its characters to get a canonical key.\n2. Group strings by this key in a HashMap.\n3. Return all values of the map.",
  javaSolution: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars); // sorted string is the anagram key
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
  complexity: { time: "O(n * k log k) where k = max string length", space: "O(n*k)" },
  simpleExplanation: "1. Sort each word's letters to get a 'fingerprint'.\n2. Words with the same fingerprint are anagrams.\n3. Group them in a map and return the groups.",
  hints: ["Sorted string as HashMap key", "computeIfAbsent for clean grouping", "Alternative: char-count array as key (avoids sorting)"],
  interviewNotes: ["Sorting each word is O(k log k); alternative is O(k) with count array as key", "computeIfAbsent is cleaner than getOrDefault + put", "Return map.values() as a new ArrayList"],
  oneLineAnswer: "Use sorted string as HashMap key; group all strings with the same sorted form together.",
  edgeCases: ["Single strings", "All strings are anagrams of each other", "Empty strings"],
  similar: [{id: 242, title: "Valid Anagram"}, {id: 438, title: "Find All Anagrams in a String"}]
},
{
  id: 56, title: "Merge Intervals", topic: "Sorting", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
  description: "Given a list of intervals, merge all overlapping intervals and return the non-overlapping result.\n\nExample:\nInput: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
  intuition: "Sort by start time. Then linearly scan: if current interval overlaps with the last merged one (start <= last end), extend the last merged interval. Otherwise start a new one.",
  approach: "1. Sort intervals by start.\n2. Add first interval to result.\n3. For each subsequent interval:\n   - If it overlaps (start <= result's last end), merge by extending end.\n   - Otherwise append as new interval.\n4. Return result.",
  javaSolution: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]); // sort by start
        List<int[]> res = new ArrayList<>();
        res.add(intervals[0]);
        for (int i = 1; i < intervals.length; i++) {
            int[] last = res.get(res.size() - 1);
            if (intervals[i][0] <= last[1]) {
                // Overlapping: extend the end of the last merged interval
                last[1] = Math.max(last[1], intervals[i][1]);
            } else {
                res.add(intervals[i]); // no overlap: start new interval
            }
        }
        return res.toArray(new int[0][]);
    }
}`,
  complexity: { time: "O(n log n)", space: "O(n)" },
  simpleExplanation: "1. Sort by start.\n2. Keep a running 'current' interval.\n3. If the next interval starts before current ends, merge (extend end).\n4. Otherwise close current and start new.",
  hints: ["Sort by start time first", "Overlap condition: next.start <= current.end", "Extend end by taking max"],
  interviewNotes: ["Must sort first — otherwise you'd miss overlaps from out-of-order intervals", "Overlap condition: intervals[i][0] <= last[1]", "Take max of ends when merging"],
  oneLineAnswer: "Sort by start, then merge each interval into the last one if they overlap (start <= last.end).",
  edgeCases: ["Single interval", "No overlapping intervals", "All intervals overlap into one"],
  similar: [{id: 57, title: "Insert Interval"}, {id: 452, title: "Minimum Number of Arrows"}, {id: 253, title: "Meeting Rooms II"}]
},

// ─── DYNAMIC PROGRAMMING ────────────────────────────────────────────────────
{
  id: 121, title: "Best Time to Buy and Sell Stock", topic: "Dynamic Programming", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  description: "Given prices of a stock on each day, find the maximum profit from one buy-sell transaction. Buy must happen before sell.\n\nExample:\nInput: prices = [7,1,5,3,6,4]\nOutput: 5 (buy at 1, sell at 6)",
  intuition: "Track the minimum price seen so far. At each day, the max profit if sold today = current price - min price so far. Update global max.",
  approach: "1. minPrice = infinity, maxProfit = 0.\n2. For each price: update minPrice = min(minPrice, price).\n3. Update maxProfit = max(maxProfit, price - minPrice).\n4. Return maxProfit.",
  javaSolution: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int price : prices) {
            minPrice = Math.min(minPrice, price); // best buy price so far
            maxProfit = Math.max(maxProfit, price - minPrice); // profit if sold today
        }
        return maxProfit;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Keep track of the cheapest price seen so far.\n2. At each day, calculate profit if we sell today.\n3. Track the maximum such profit.",
  hints: ["Track running minimum", "Profit today = current - minSoFar", "Single pass O(n)"],
  interviewNotes: ["Classic DP simplification: only need running min", "No need for 2D DP — 1D scan suffices", "Contrast with Stock II (multiple transactions)"],
  oneLineAnswer: "Track running minimum price; profit at each step = price - minSoFar; return the max profit.",
  edgeCases: ["Prices strictly decreasing → 0 profit", "Single price → 0 profit", "All same prices"],
  similar: [{id: 122, title: "Best Time to Buy and Sell Stock II"}, {id: 123, title: "Best Time III"}, {id: 309, title: "Best Time with Cooldown"}]
},
{
  id: 53, title: "Maximum Subarray", topic: "Dynamic Programming", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
  description: "Given an integer array, find the contiguous subarray with the largest sum and return its sum.\n\nExample:\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6 (subarray [4,-1,2,1])",
  intuition: "Kadane's Algorithm: extend current subarray if it's beneficial; start fresh if current sum goes negative. At each position, decide: extend or restart.",
  approach: "1. currentSum = nums[0], maxSum = nums[0].\n2. For each element from index 1:\n   - currentSum = max(nums[i], currentSum + nums[i]) — extend or restart.\n   - maxSum = max(maxSum, currentSum).\n3. Return maxSum.",
  javaSolution: `class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0], maxSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            // Either extend previous subarray or start fresh at this element
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Walk through the array.\n2. At each position: extend the running sum, or restart from this element (whichever is bigger).\n3. Track the maximum running sum ever seen.",
  hints: ["Kadane's Algorithm", "If currentSum goes negative, restart from current element", "O(1) space DP"],
  interviewNotes: ["Kadane's is the classic O(n)/O(1) solution", "Divide and conquer gives O(n log n) — mention as alternative", "Also solvable with prefix sums"],
  oneLineAnswer: "Kadane's: at each element, take max of (element alone) vs (extend current sum); track global max.",
  edgeCases: ["All negative → return largest negative", "Single element", "All positive → entire array"],
  similar: [{id: 918, title: "Maximum Sum Circular Subarray"}, {id: 152, title: "Maximum Product Subarray"}]
},
{
  id: 70, title: "Climbing Stairs", topic: "Dynamic Programming", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
  description: "You are climbing a staircase. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top (n steps)?\n\nExample:\nInput: n = 3\nOutput: 3 (1+1+1, 1+2, 2+1)",
  intuition: "To reach step n, you either came from step n-1 (1 step) or step n-2 (2 steps). So ways(n) = ways(n-1) + ways(n-2). This is the Fibonacci sequence.",
  approach: "1. Base: ways(1) = 1, ways(2) = 2.\n2. For n >= 3: ways(n) = ways(n-1) + ways(n-2).\n3. Use two variables instead of full array — O(1) space.",
  javaSolution: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2; // ways to reach step 1 and 2
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2; // reach step i from i-1 or i-2
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. To reach step n, you come from n-1 or n-2.\n2. So the answer is Fibonacci-like: f(n) = f(n-1) + f(n-2).\n3. Keep only the last two values to save space.",
  hints: ["This is Fibonacci", "O(1) space: only two variables needed", "Base cases: f(1)=1, f(2)=2"],
  interviewNotes: ["Fibonacci relationship is key insight", "Classic DP with O(1) space optimization", "Can also use memoization (O(n) space)"],
  oneLineAnswer: "ways(n) = ways(n-1) + ways(n-2) — identical to Fibonacci, computed with O(1) space.",
  edgeCases: ["n=1: 1 way", "n=2: 2 ways", "Large n: watch for integer overflow in harder variants"],
  similar: [{id: 198, title: "House Robber"}, {id: 746, title: "Min Cost Climbing Stairs"}]
},
{
  id: 198, title: "House Robber", topic: "Dynamic Programming", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/house-robber/",
  description: "You are a robber. Each house has some money. Adjacent houses have alarms — you can't rob two consecutive houses. Maximize total money robbed.\n\nExample:\nInput: nums = [2,7,9,3,1]\nOutput: 12 (rob houses 0,2,4 → 2+9+1=12)",
  intuition: "At each house, choose: rob it (add to what you got two houses ago) or skip it (take what you had at previous house). dp[i] = max(dp[i-1], dp[i-2] + nums[i]).",
  approach: "1. If n==1, return nums[0].\n2. prev2 = nums[0], prev1 = max(nums[0], nums[1]).\n3. For i >= 2: curr = max(prev1, prev2 + nums[i]).\n4. Return prev1 (last computed max).",
  javaSolution: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        int prev2 = nums[0], prev1 = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]); // skip or rob current
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. At each house, decide: rob it or skip.\n2. If you rob: add current value to best from 2 houses back.\n3. If you skip: carry forward the best from 1 house back.\n4. Take the maximum.",
  hints: ["dp[i] = max(dp[i-1], dp[i-2] + nums[i])", "O(1) space by keeping only prev2 and prev1", "Similar to Fibonacci rolling variables"],
  interviewNotes: ["State transition: rob or skip current house", "O(1) space optimization: only need last two values", "Circular variant: House Robber II (run twice, skip first or last)"],
  oneLineAnswer: "dp[i] = max(skip: dp[i-1], rob: dp[i-2] + nums[i]) — track only last two values.",
  edgeCases: ["Single house", "Two houses: take the larger", "Strictly increasing values"],
  similar: [{id: 213, title: "House Robber II"}, {id: 337, title: "House Robber III"}, {id: 70, title: "Climbing Stairs"}]
},
{
  id: 120, title: "Triangle", topic: "Dynamic Programming", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/triangle/",
  description: "Given a triangle array, find the minimum path sum from top to bottom. Each step you may move to adjacent indices (index i or i+1 from row above).\n\nExample:\nInput: [[2],[3,4],[6,5,7],[4,1,8,3]]\nOutput: 11 (2+3+5+1)",
  intuition: "Work bottom-up. Start from second-to-last row and update each element to be the min path sum going downward. At the end, triangle[0][0] holds the answer.",
  approach: "1. Start from the second-to-last row.\n2. For each element, add the minimum of its two children below.\n3. After processing all rows, triangle[0][0] = minimum total path.",
  javaSolution: `class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        // Work bottom-up: each cell = cell value + min of two children below
        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col <= row; col++) {
                int best = Math.min(triangle.get(row + 1).get(col),
                                    triangle.get(row + 1).get(col + 1));
                triangle.get(row).set(col, triangle.get(row).get(col) + best);
            }
        }
        return triangle.get(0).get(0);
    }
}`,
  complexity: { time: "O(n²)", space: "O(1) — modifies input" },
  simpleExplanation: "1. Start from the bottom row.\n2. For each element, add the smaller of its two children below.\n3. Bubble the minimum path sums upward.\n4. The top element ends up with the minimum total path.",
  hints: ["Bottom-up DP avoids tracking paths", "Modify triangle in-place (or use 1D dp array)", "Each element has exactly 2 children"],
  interviewNotes: ["Bottom-up eliminates the need for a separate dp array", "Top-down with memoization also works but needs extra space", "In-place modification is O(1) extra space"],
  oneLineAnswer: "Bottom-up DP: each cell = itself + min of two children below; triangle[0][0] is the answer.",
  edgeCases: ["Single row: return that element", "All elements same value", "Very large triangle"],
  similar: [{id: 64, title: "Minimum Path Sum"}, {id: 931, title: "Minimum Falling Path Sum"}]
},
{
  id: 97, title: "Interleaving String", topic: "Dynamic Programming", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/interleaving-string/",
  description: "Given strings s1, s2, s3, determine if s3 is formed by interleaving s1 and s2 (characters in original order).\n\nExample:\nInput: s1='aabcc', s2='dbbca', s3='aadbbcbcac'\nOutput: true",
  intuition: "2D DP: dp[i][j] = true if s3[0..i+j-1] can be formed by interleaving s1[0..i-1] and s2[0..j-1]. At each cell, check if we can extend from left or top.",
  approach: "1. If len(s1)+len(s2) != len(s3), return false.\n2. dp[i][j] = can s3[0..i+j-1] be formed from s1[0..i-1] and s2[0..j-1].\n3. dp[i][j] = (dp[i-1][j] && s1[i-1]==s3[i+j-1]) || (dp[i][j-1] && s2[j-1]==s3[i+j-1]).\n4. Return dp[m][n].",
  javaSolution: `class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int i = 1; i <= m; i++)
            dp[i][0] = dp[i-1][0] && s1.charAt(i-1) == s3.charAt(i-1);
        for (int j = 1; j <= n; j++)
            dp[0][j] = dp[0][j-1] && s2.charAt(j-1) == s3.charAt(j-1);
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                // Can we reach here using s1[i-1] from above, or s2[j-1] from left?
                dp[i][j] = (dp[i-1][j] && s1.charAt(i-1) == s3.charAt(i+j-1))
                         || (dp[i][j-1] && s2.charAt(j-1) == s3.charAt(i+j-1));
            }
        }
        return dp[m][n];
    }
}`,
  complexity: { time: "O(m*n)", space: "O(m*n)" },
  simpleExplanation: "1. Build a 2D table where dp[i][j] = can we form s3[0..i+j-1] using s1's first i and s2's first j chars.\n2. Each cell is reachable if we can extend from above (using s1 char) or from left (using s2 char).\n3. Answer is dp[m][n].",
  hints: ["2D DP: dp[i][j] = can form s3[0..i+j] from s1[0..i] and s2[0..j]", "Length check first", "Can optimize to 1D DP"],
  interviewNotes: ["Classic 2D string DP", "Space-optimizable to O(n) with rolling array", "Length check prevents obvious false cases"],
  oneLineAnswer: "dp[i][j] = true if s3[:i+j] can be interleaved from s1[:i] and s2[:j], extended via char match from above or left.",
  edgeCases: ["Length mismatch → false", "Empty s1 or s2 → check if s3 == s2 or s1"],
  similar: [{id: 72, title: "Edit Distance"}, {id: 115, title: "Distinct Subsequences"}]
},
{
  id: 72, title: "Edit Distance", topic: "Dynamic Programming", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
  description: "Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.\n\nExample:\nInput: word1='horse', word2='ros'\nOutput: 3",
  intuition: "dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]. If chars match, dp[i][j] = dp[i-1][j-1]. Otherwise take 1 + min(replace, delete, insert).",
  approach: "1. dp[0][j] = j (insert j chars), dp[i][0] = i (delete i chars).\n2. If word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1].\n3. Else dp[i][j] = 1 + min(dp[i-1][j-1] replace, dp[i-1][j] delete, dp[i][j-1] insert).\n4. Return dp[m][n].",
  javaSolution: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i; // delete all of word1
        for (int j = 0; j <= n; j++) dp[0][j] = j; // insert all of word2
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i-1) == word2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1]; // chars match: no operation needed
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1],  // replace
                                   Math.min(dp[i-1][j],     // delete from word1
                                            dp[i][j-1]));   // insert into word1
                }
            }
        }
        return dp[m][n];
    }
}`,
  complexity: { time: "O(m*n)", space: "O(m*n)" },
  simpleExplanation: "1. dp[i][j] = edits needed to convert first i chars of word1 to first j chars of word2.\n2. If last chars match, inherit the diagonal value.\n3. Otherwise, take 1 + minimum of (replace, delete, insert).",
  hints: ["Classic 2D DP with 3 operations", "Matching chars: dp[i][j] = dp[i-1][j-1]", "Three neighbors: diagonal=replace, up=delete, left=insert"],
  interviewNotes: ["Must memorize the 3 transitions: replace (diagonal), delete (above), insert (left)", "Space optimizable to O(n) with 2 rows", "Levenstein distance is the standard algorithm"],
  oneLineAnswer: "dp[i][j] = min edits for word1[:i]→word2[:j]: if chars match use diagonal, else 1 + min(replace, delete, insert).",
  edgeCases: ["One string empty: answer is length of other", "Same strings: 0 operations", "Completely different strings"],
  similar: [{id: 583, title: "Delete Operation for Two Strings"}, {id: 712, title: "Minimum ASCII Delete Sum"}]
},
{
  id: 123, title: "Best Time to Buy and Sell Stock III", topic: "Dynamic Programming", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
  description: "Given stock prices, find the maximum profit with at most 2 transactions. You must sell before buying again.\n\nExample:\nInput: prices = [3,3,5,0,0,3,1,4]\nOutput: 6",
  intuition: "Track four states: best profit after 1st buy, 1st sell, 2nd buy, 2nd sell. Update each state optimally through the array.",
  approach: "1. buy1 = -infinity, sell1 = 0, buy2 = -infinity, sell2 = 0.\n2. For each price: buy1 = max(buy1, -price), sell1 = max(sell1, buy1+price), buy2 = max(buy2, sell1-price), sell2 = max(sell2, buy2+price).\n3. Return sell2.",
  javaSolution: `class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = Integer.MIN_VALUE, sell1 = 0;
        int buy2 = Integer.MIN_VALUE, sell2 = 0;
        for (int price : prices) {
            buy1  = Math.max(buy1,  -price);        // best profit after 1st buy
            sell1 = Math.max(sell1, buy1 + price);  // best profit after 1st sell
            buy2  = Math.max(buy2,  sell1 - price); // best profit after 2nd buy
            sell2 = Math.max(sell2, buy2 + price);  // best profit after 2nd sell
        }
        return sell2;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Track 4 states: best outcome after each of the 4 events (buy1, sell1, buy2, sell2).\n2. Update each state greedily at every price.\n3. Final sell2 is the answer.",
  hints: ["State machine: 4 states for 2 transactions", "buy2 uses sell1 profit (chain transactions)", "Initialize buys to -INF, sells to 0"],
  interviewNotes: ["State machine approach generalizes to k transactions", "O(1) space — no array needed", "Generalization: Best Time IV uses k-state DP"],
  oneLineAnswer: "Track 4 states (buy1, sell1, buy2, sell2) updated greedily; sell2 is the answer.",
  edgeCases: ["Prices strictly decreasing → 0", "All same prices → 0", "Only 1 or 2 days"],
  similar: [{id: 121, title: "Best Time I"}, {id: 122, title: "Best Time II"}, {id: 188, title: "Best Time IV"}]
},
{
  id: 188, title: "Best Time to Buy and Sell Stock IV", topic: "Dynamic Programming", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
  description: "Given stock prices and k, find maximum profit with at most k transactions.\n\nExample:\nInput: k=2, prices=[3,2,6,5,0,3]\nOutput: 7",
  intuition: "If k >= n/2, unlimited transactions are allowed (solve like Stock II). Otherwise, use DP with 2D state: dp[t][d] = max profit using at most t transactions up to day d.",
  approach: "1. If k >= n/2, greedily take all profits (Stock II).\n2. Otherwise: dp[t][i] = max profit with t transactions up to day i.\n3. dp[t][i] = max(dp[t][i-1], max over j<i of (prices[i]-prices[j]+dp[t-1][j])).\n4. Optimize with running maxSoFar.",
  javaSolution: `class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (k >= n / 2) { // unlimited transactions
            int profit = 0;
            for (int i = 1; i < n; i++)
                if (prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];
            return profit;
        }
        int[] buy = new int[k + 1], sell = new int[k + 1];
        Arrays.fill(buy, Integer.MIN_VALUE);
        for (int price : prices) {
            for (int t = 1; t <= k; t++) {
                buy[t]  = Math.max(buy[t],  sell[t-1] - price); // buy for t-th txn
                sell[t] = Math.max(sell[t], buy[t] + price);    // sell for t-th txn
            }
        }
        return sell[k];
    }
}`,
  complexity: { time: "O(n*k)", space: "O(k)" },
  simpleExplanation: "1. If k is large, any profitable trade is allowed — take every up-move.\n2. Otherwise, track best buy and sell price for each transaction count.\n3. Chain transactions: buy[t] uses sell[t-1] profit.",
  hints: ["k >= n/2 → unlimited transactions shortcut", "State arrays: buy[t] and sell[t] for each transaction count", "Chain: buy[t] builds on sell[t-1]"],
  interviewNotes: ["Must handle k >= n/2 edge case first", "Generalizes Stock III (k=2)", "O(k) space with rolling arrays"],
  oneLineAnswer: "If k >= n/2, greedy; else track buy[t] and sell[t] states updated for each price, chaining t transactions.",
  edgeCases: ["k=0: no profit", "k >= n/2: unlimited", "Single price: no profit"],
  similar: [{id: 123, title: "Best Time III"}, {id: 122, title: "Best Time II"}]
},

// ─── GREEDY ──────────────────────────────────────────────────────────────────
{
  id: 122, title: "Best Time to Buy and Sell Stock II", topic: "Greedy", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
  description: "Given stock prices, find the maximum profit with unlimited transactions. You must sell before buying again.\n\nExample:\nInput: prices = [7,1,5,3,6,4]\nOutput: 7 (buy at 1 sell at 5, buy at 3 sell at 6)",
  intuition: "Take every upward price movement. If prices[i] > prices[i-1], add the difference — this captures all profitable segments.",
  approach: "1. For each consecutive pair of days.\n2. If prices[i] > prices[i-1], add the difference to profit.\n3. Return total profit.",
  javaSolution: `class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            // Capture every upward price movement
            if (prices[i] > prices[i - 1])
                profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Whenever the price goes up from one day to the next, take that profit.\n2. This is equivalent to buying at every valley and selling at every peak.",
  hints: ["Sum all positive daily differences", "Equivalent to buy at every valley, sell at every peak", "One pass O(n)"],
  interviewNotes: ["Greedy: take every up-move", "No need to track specific buy/sell days", "Contrast with Stock I (one transaction only)"],
  oneLineAnswer: "Sum all positive price increases — this captures the optimal buy-low-sell-high sequence.",
  edgeCases: ["Strictly decreasing → 0", "Strictly increasing → prices[n-1] - prices[0]"],
  similar: [{id: 121, title: "Best Time I"}, {id: 123, title: "Best Time III"}]
},
{
  id: 55, title: "Jump Game", topic: "Greedy", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/jump-game/",
  description: "Given an array where nums[i] is the max jump length at position i, return true if you can reach the last index from index 0.\n\nExample:\nInput: nums = [2,3,1,1,4]\nOutput: true",
  intuition: "Track the maximum reachable index. If at any point your current position exceeds the max reachable, you're stuck. If max reachable reaches the end, success.",
  approach: "1. maxReach = 0.\n2. For each index i from 0 to n-1:\n   - If i > maxReach, can't proceed — return false.\n   - Update maxReach = max(maxReach, i + nums[i]).\n3. Return true.",
  javaSolution: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false; // stuck: can't reach this position
            maxReach = Math.max(maxReach, i + nums[i]); // update furthest reachable
        }
        return true;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Track how far you can reach at any point.\n2. If your current index is beyond your reach, you're stuck.\n3. Otherwise keep updating the farthest you can reach.",
  hints: ["Track maxReach greedily", "If i > maxReach, unreachable", "No need for DP"],
  interviewNotes: ["Greedy beats DP here — O(n) vs O(n²)", "Key: if you reach a 0, check if maxReach >= that index", "Single pass, no backtracking"],
  oneLineAnswer: "Track maxReach greedily; if current index ever exceeds maxReach, return false.",
  edgeCases: ["Single element → true", "First element is 0 and n > 1 → false", "All zeros except last"],
  similar: [{id: 45, title: "Jump Game II"}, {id: 1345, title: "Jump Game IV"}]
},
{
  id: 45, title: "Jump Game II", topic: "Greedy", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
  description: "Given an array where nums[i] is max jump length, return the minimum number of jumps to reach the last index. It's guaranteed you can reach the end.\n\nExample:\nInput: nums = [2,3,1,1,4]\nOutput: 2",
  intuition: "BFS-like greedy: at each 'level' (jump count), find the farthest you can reach within the current range. The number of levels is the minimum jumps.",
  approach: "1. jumps = 0, currentEnd = 0, farthest = 0.\n2. For i from 0 to n-2: update farthest = max(farthest, i + nums[i]).\n3. When i == currentEnd: increment jumps, currentEnd = farthest.\n4. Return jumps.",
  javaSolution: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0, currentEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]); // best reach within current jump
            if (i == currentEnd) { // used up current jump range: must jump again
                jumps++;
                currentEnd = farthest; // extend to farthest reachable
            }
        }
        return jumps;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. Think of it as BFS levels — each level is one jump.\n2. Within the current jump's reach, find the farthest you can get with the next jump.\n3. When you exhaust the current level, take a jump and move to the next level.",
  hints: ["BFS level = one jump", "Track currentEnd and farthest", "Loop only to n-2 (don't need to jump from last)"],
  interviewNotes: ["Greedy BFS: each 'wave' costs one jump", "Loop to n-2: at n-1 (last), no need to jump further", "O(n) greedy beats O(n²) DP"],
  oneLineAnswer: "BFS-greedy: track farthest reachable in current jump level; when level ends, increment jumps.",
  edgeCases: ["Single element: 0 jumps", "Must reach exactly last index", "Large 0 zones"],
  similar: [{id: 55, title: "Jump Game"}, {id: 1345, title: "Jump Game IV"}]
},
{
  id: 134, title: "Gas Station", topic: "Greedy", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/gas-station/",
  description: "There are n gas stations in a circle. gas[i] is gas available at station i, cost[i] is gas needed to reach the next station. Find the starting station to complete the circuit, or -1.\n\nExample:\nInput: gas=[1,2,3,4,5], cost=[3,4,5,1,2]\nOutput: 3",
  intuition: "If total gas >= total cost, a solution exists and is unique. The start is where the cumulative tank never goes negative. Reset start whenever tank goes negative.",
  approach: "1. If sum(gas) < sum(cost), return -1.\n2. Otherwise track tank = 0, start = 0.\n3. For each station: tank += gas[i] - cost[i].\n4. If tank < 0, reset start = i+1 and tank = 0.\n5. Return start.",
  javaSolution: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalTank = 0, currentTank = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            totalTank += diff;
            currentTank += diff;
            if (currentTank < 0) { // can't continue from this start
                start = i + 1;    // try starting at next station
                currentTank = 0;
            }
        }
        return totalTank >= 0 ? start : -1; // valid if total supply >= total cost
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. If total gas < total cost, impossible — return -1.\n2. Drive around; whenever you run out of gas, the starting point can't be anywhere before.\n3. Reset start to the next station.",
  hints: ["Total gas >= total cost → solution exists and is unique", "If tank goes negative, everything before is invalid start", "Single pass O(n)"],
  interviewNotes: ["Key insight: if total gas >= total cost, a unique solution exists", "Whenever tank < 0, reset start — no station in that range can be valid start", "O(1) space, O(n) time"],
  oneLineAnswer: "If total gas >= cost, the start is where cumulative tank last went negative (reset point).",
  edgeCases: ["All stations fail → -1", "Single station", "One valid starting point"],
  similar: [{id: 55, title: "Jump Game"}]
},
{
  id: 135, title: "Candy", topic: "Greedy", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/candy/",
  description: "Give candies to children in a line. Each child must have at least 1 candy. Children with higher ratings than their neighbors get more candies. Find the minimum total candies.\n\nExample:\nInput: ratings = [1,0,2]\nOutput: 5 (candies = [2,1,2])",
  intuition: "Two-pass greedy: left-to-right ensures right neighbor satisfaction; right-to-left ensures left neighbor satisfaction. Take the max at each position.",
  approach: "1. Initialize all candies to 1.\n2. Left to right: if ratings[i] > ratings[i-1], candies[i] = candies[i-1]+1.\n3. Right to left: if ratings[i] > ratings[i+1], candies[i] = max(candies[i], candies[i+1]+1).\n4. Return sum.",
  javaSolution: `class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] candies = new int[n];
        Arrays.fill(candies, 1); // everyone gets at least 1
        // Left pass: satisfy right-neighbor constraint
        for (int i = 1; i < n; i++)
            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        // Right pass: satisfy left-neighbor constraint (take max to preserve left pass)
        for (int i = n - 2; i >= 0; i--)
            if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        int total = 0;
        for (int c : candies) total += c;
        return total;
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Give everyone 1 candy.\n2. Walk left-to-right: give more if rating is higher than left neighbor.\n3. Walk right-to-left: give more if rating is higher than right neighbor (don't decrease existing).\n4. Sum up.",
  hints: ["Two passes: left-to-right, then right-to-left", "Take max when doing right-to-left pass", "Must initialize to 1"],
  interviewNotes: ["Two-pass greedy: each pass handles one direction constraint", "Take max in second pass to preserve first pass results", "O(n) space for candies array"],
  oneLineAnswer: "Two-pass greedy: left-to-right for right-neighbor constraint, right-to-left for left-neighbor; take max at each position.",
  edgeCases: ["All same ratings: all get 1 candy", "Strictly increasing: 1,2,3,...,n", "V-shape: requires careful max"],
  similar: [{id: 42, title: "Trapping Rain Water"}]
},
{
  id: 452, title: "Minimum Number of Arrows to Burst Balloons", topic: "Greedy", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
  description: "Balloons are represented as intervals [start, end] on x-axis. An arrow at x bursts all balloons whose range includes x. Find minimum arrows to burst all balloons.\n\nExample:\nInput: points = [[10,16],[2,8],[1,6],[7,12]]\nOutput: 2",
  intuition: "Sort by end position. Shoot at the end of the first balloon. This arrow also bursts any overlapping balloon. When a balloon doesn't overlap, shoot a new arrow.",
  approach: "1. Sort balloons by end coordinate.\n2. Shoot first arrow at points[0][1].\n3. For each subsequent balloon: if its start > last arrow position, shoot a new arrow at its end.\n4. Count arrows.",
  javaSolution: `class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1])); // sort by end
        int arrows = 1, arrowPos = points[0][1];
        for (int i = 1; i < points.length; i++) {
            if (points[i][0] > arrowPos) { // new balloon doesn't overlap: need new arrow
                arrows++;
                arrowPos = points[i][1]; // shoot at end of this balloon
            }
        }
        return arrows;
    }
}`,
  complexity: { time: "O(n log n)", space: "O(1)" },
  simpleExplanation: "1. Sort by ending position.\n2. Shoot an arrow at the end of the first balloon.\n3. That arrow also bursts any balloon that started before that point.\n4. Only shoot new arrow when a balloon starts after the last arrow.",
  hints: ["Sort by end coordinate", "Greedy: shoot at current balloon's end to cover maximum overlapping balloons", "New arrow needed when start > last arrow position"],
  interviewNotes: ["Sorting by end is key — ensures we cover maximum overlaps greedily", "Avoid Integer subtraction for comparator (overflow) — use Integer.compare", "Similar to interval scheduling / merge intervals"],
  oneLineAnswer: "Sort by end; greedily shoot each arrow at current balloon's end, counting new arrows only when no overlap.",
  edgeCases: ["Single balloon: 1 arrow", "No overlapping balloons: n arrows", "All balloons at same point: 1 arrow"],
  similar: [{id: 435, title: "Non-overlapping Intervals"}, {id: 56, title: "Merge Intervals"}]
}
];

