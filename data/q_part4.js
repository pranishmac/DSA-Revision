// Part 4: Tree Traversal (18) + Bit Manipulation (7) + BFS (4) + Topological Sort (2) + Backtracking (7) + Binary Search (8) + Heap (4) = 50 questions
const QUESTIONS_PART4 = [
// ─── TREE TRAVERSAL ─────────────────────────────────────────────────────────
{
  id: 104, title: "Maximum Depth of Binary Tree", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
  description: "Given the root of a binary tree, return its maximum depth (number of nodes along longest path from root to farthest leaf node).\n\nExample:\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3",
  intuition: "Recursive DFS: depth of a tree is 1 + max(depth of left subtree, depth of right subtree). Base case: empty tree has depth 0.",
  approach: "1. If root == null, return 0.\n2. Recursively find maxDepth(root.left) and maxDepth(root.right).\n3. Return 1 + Math.max(left, right).",
  javaSolution: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
  complexity: { time: "O(n)", space: "O(h) call stack where h is tree height" },
  simpleExplanation: "1. If there is no tree, depth is 0.\n2. Otherwise, find the depth of the left and right sides.\n3. Take the bigger one and add 1 for the current node.",
  hints: ["Divide and conquer recursion", "1 + max(left, right)", "Base case root == null return 0"],
  interviewNotes: ["Can also be solved iteratively with level-order traversal (BFS) counting levels", "Worst case space is O(n) for a degenerate skewed tree", "Most fundamental tree problem"],
  oneLineAnswer: "Recursively return 1 + max(maxDepth(root.left), maxDepth(root.right)) with base case 0 for null.",
  edgeCases: ["Empty tree (root == null): 0", "Single node: 1", "Completely skewed tree"],
  similar: [{id: 111, title: "Minimum Depth of Binary Tree"}, {id: 559, title: "Maximum Depth of N-ary Tree"}]
},
{
  id: 100, title: "Same Tree", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/same-tree/",
  description: "Given roots of two binary trees p and q, write a function to check if they are the same (structurally identical with same node values).\n\nExample:\nInput: p = [1,2,3], q = [1,2,3]\nOutput: true",
  intuition: "Two trees are identical if both roots are null, or both roots have identical values and both their left and right subtrees are identical.",
  approach: "1. If p == null && q == null, return true.\n2. If p == null || q == null || p.val != q.val, return false.\n3. Return isSameTree(p.left, q.left) && isSameTree(p.right, q.right).",
  javaSolution: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. If both nodes are null, they match.\n2. If only one is null, or their values differ, they don't match.\n3. Recursively check both left children and both right children.",
  hints: ["Check null cases first", "Compare root values", "Recurse left and right simultaneously"],
  interviewNotes: ["Short-circuit evaluation stops recursion as soon as any mismatch is found", "Iterative version can use two queues or stacks simultaneously", "Order of null checks matters"],
  oneLineAnswer: "Two trees are identical if roots have equal values and their left and right subtrees are recursively identical.",
  edgeCases: ["Both trees empty: true", "One empty, one non-empty: false", "Same values but different structures"],
  similar: [{id: 101, title: "Symmetric Tree"}]
},
{
  id: 226, title: "Invert Binary Tree", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
  description: "Given the root of a binary tree, invert the tree (mirror image) and return its root.\n\nExample:\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]",
  intuition: "Swap the left and right child of the current node, then recursively invert the left and right subtrees.",
  approach: "1. If root == null, return null.\n2. Swap root.left and root.right.\n3. Recursively call invertTree on both children.\n4. Return root.",
  javaSolution: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. At every node, swap its left and right arms.\n2. Do the same for every subtree down to the leaves.",
  hints: ["Swap left and right pointers", "Recursively invert subtrees", "Base case root == null"],
  interviewNotes: ["Famous Max Howell Homebrew tweet problem", "Can also be done iteratively with BFS queue or DFS stack swapping children", "In-place tree modification"],
  oneLineAnswer: "Swap left and right children and recursively invert both subtrees.",
  edgeCases: ["Empty tree: null", "Single node: unchanged", "Tree with only left or only right children"],
  similar: [{id: 101, title: "Symmetric Tree"}]
},
{
  id: 101, title: "Symmetric Tree", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
  description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).\n\nExample:\nInput: root = [1,2,2,3,4,4,3]\nOutput: true",
  intuition: "Two subtrees are mirrors if their roots are equal and left's left mirrors right's right while left's right mirrors right's left.",
  approach: "1. Helper isMirror(t1, t2):\n   - If both null, return true.\n   - If one null or values differ, return false.\n   - Return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left).\n2. Call isMirror(root.left, root.right).",
  javaSolution: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return root == null || isMirror(root.left, root.right);
    }

    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null || t1.val != t2.val) return false;
        // Outer pairs match AND inner pairs match
        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. Compare left and right subtrees as mirror reflections.\n2. Outer children must match: t1.left with t2.right.\n3. Inner children must match: t1.right with t2.left.",
  hints: ["Helper function comparing two nodes", "Cross-comparison: left.left with right.right, left.right with right.left", "Iterative version uses a Queue"],
  interviewNotes: ["Notice the cross-link recursion: t1.left with t2.right, and t1.right with t2.left", "Can be solved iteratively with Queue pushing nodes in pairs", "Root value itself doesn't affect symmetry"],
  oneLineAnswer: "Recursively verify that t1.val == t2.val, t1.left mirrors t2.right, and t1.right mirrors t2.left.",
  edgeCases: ["Single node tree: true", "Same values but asymmetric structure", "Null root: true"],
  similar: [{id: 100, title: "Same Tree"}]
},
{
  id: 105, title: "Construct Binary Tree from Preorder and Inorder Traversal", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
  description: "Given preorder and inorder traversal arrays of a binary tree, construct and return the binary tree.\n\nExample:\nInput: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\nOutput: [3,9,20,null,null,15,7]",
  intuition: "First element of preorder is always the root. Find this root in inorder: everything to its left belongs to the left subtree, and everything to its right belongs to the right subtree. Recurse.",
  approach: "1. Store inorder value -> index in a HashMap for O(1) lookup.\n2. Helper build(preStart, inStart, inEnd):\n   - If inStart > inEnd, return null.\n   - rootVal = preorder[preStart].\n   - inRoot = map.get(rootVal).\n   - leftTreeSize = inRoot - inStart.\n   - root.left = build(preStart + 1, inStart, inRoot - 1).\n   - root.right = build(preStart + 1 + leftTreeSize, inRoot + 1, inEnd).\n   - Return root.",
  javaSolution: `class Solution {
    private Map<Integer, Integer> inMap = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);
        return build(preorder, 0, 0, inorder.length - 1);
    }

    private TreeNode build(int[] preorder, int preStart, int inStart, int inEnd) {
        if (inStart > inEnd) return null;

        TreeNode root = new TreeNode(preorder[preStart]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;

        root.left = build(preorder, preStart + 1, inStart, inRoot - 1);
        root.right = build(preorder, preStart + 1 + numsLeft, inRoot + 1, inEnd);
        return root;
    }
}`,
  complexity: { time: "O(n)", space: "O(n) for HashMap and recursion" },
  simpleExplanation: "1. Preorder gives you the root immediately (it's the first number).\n2. Find that root in the inorder list: everything to the left is the left branch, everything to the right is the right branch.\n3. Recurse on both branches.",
  hints: ["Preorder tells you the ROOT", "Inorder tells you LEFT vs RIGHT subtree split", "Use HashMap to find inorder index in O(1)"],
  interviewNotes: ["HashMap lookup for inorder index makes this O(n) instead of O(n²)", "Calculate left subtree size (inRoot - inStart) to jump preorder pointer for right child", "All values are guaranteed unique"],
  oneLineAnswer: "Root is preorder[preStart]; find root in inorder to split into left and right subtrees, then construct recursively in O(n).",
  edgeCases: ["Single node tree", "Tree with only left or right branch", "Leaves only"],
  similar: [{id: 106, title: "Construct Binary Tree from Inorder and Postorder"}]
},
{
  id: 106, title: "Construct Binary Tree from Inorder and Postorder Traversal", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
  description: "Given inorder and postorder traversal arrays, construct and return the binary tree.\n\nExample:\nInput: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]\nOutput: [3,9,20,null,null,15,7]",
  intuition: "Last element of postorder is always the root. Look up root in inorder to find left and right subtree boundaries, then construct recursively.",
  approach: "1. Put inorder value -> index into HashMap.\n2. Helper build(postEnd, inStart, inEnd):\n   - If inStart > inEnd, return null.\n   - rootVal = postorder[postEnd].\n   - inRoot = map.get(rootVal).\n   - numsRight = inEnd - inRoot.\n   - root.right = build(postEnd - 1, inRoot + 1, inEnd).\n   - root.left = build(postEnd - 1 - numsRight, inStart, inRoot - 1).\n   - Return root.",
  javaSolution: `class Solution {
    private Map<Integer, Integer> inMap = new HashMap<>();

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        for (int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);
        return build(postorder, postorder.length - 1, 0, inorder.length - 1);
    }

    private TreeNode build(int[] postorder, int postEnd, int inStart, int inEnd) {
        if (inStart > inEnd) return null;

        TreeNode root = new TreeNode(postorder[postEnd]);
        int inRoot = inMap.get(root.val);
        int numsRight = inEnd - inRoot;

        // Build right first because postEnd - 1 is the right child's root
        root.right = build(postorder, postEnd - 1, inRoot + 1, inEnd);
        root.left = build(postorder, postEnd - 1 - numsRight, inStart, inRoot - 1);
        return root;
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Postorder gives you the root at the very end.\n2. Find that root in the inorder list to split left and right children.\n3. Recurse, building the right subtree first (since it precedes root in reverse postorder).",
  hints: ["Postorder END is the root", "Build right subtree before left subtree", "HashMap for O(1) inorder lookups"],
  interviewNotes: ["Notice we build root.right before root.left because postEnd - 1 immediately gives right child's root", "Offset postEnd by numsRight to locate root of left subtree", "Dual to problem 105"],
  oneLineAnswer: "Root is postorder[postEnd]; split inorder at root, construct right child first, then left child.",
  edgeCases: ["Single node tree", "Skewed trees", "All unique values"],
  similar: [{id: 105, title: "Construct Binary Tree from Preorder and Inorder"}]
},
{
  id: 112, title: "Path Sum", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/path-sum/",
  description: "Given the root of a binary tree and targetSum, return true if the tree has a root-to-leaf path such that adding all the values along the path equals targetSum.\n\nExample:\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\nOutput: true",
  intuition: "DFS: at each node, subtract node.val from targetSum. If at a leaf node and remaining targetSum == node.val, path found.",
  approach: "1. If root == null, return false.\n2. If root is a leaf (root.left == null && root.right == null), return targetSum == root.val.\n3. Recurse on left or right with (targetSum - root.val).",
  javaSolution: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        // Must be a leaf node (both children null)
        if (root.left == null && root.right == null) {
            return targetSum == root.val;
        }
        int remaining = targetSum - root.val;
        return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. Deduct current node's value from targetSum.\n2. If you reach a leaf node and the remaining target is 0, path is valid.\n3. Otherwise, check left and right branches.",
  hints: ["Subtract node.val as you go down", "Only leaf nodes qualify (both children must be null)", "Short-circuit with ||"],
  interviewNotes: ["Leaf node condition is critical: root.left == null && root.right == null", "Negative values are allowed, so do not prune early based on sum > target", "O(h) recursion space"],
  oneLineAnswer: "Subtract node.val along path; return true if a leaf node is reached with targetSum == node.val.",
  edgeCases: ["Empty tree: return false", "Node with only one child is not a leaf", "Negative values in tree"],
  similar: [{id: 113, title: "Path Sum II"}, {id: 129, title: "Sum Root to Leaf Numbers"}]
},
{
  id: 129, title: "Sum Root to Leaf Numbers", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
  description: "Each root-to-leaf path represents a number formed by concatenating node values. Return the sum of all root-to-leaf numbers.\n\nExample:\nInput: root = [1,2,3]\nOutput: 25 (12 + 13 = 25)",
  intuition: "DFS: pass current running number currNum * 10 + node.val down the tree. At a leaf node, return this number. At internal nodes, return sum of left and right recursive calls.",
  approach: "1. Helper dfs(node, curr):\n   - If node == null, return 0.\n   - curr = curr * 10 + node.val.\n   - If leaf: return curr.\n   - Return dfs(node.left, curr) + dfs(node.right, curr).\n2. Return dfs(root, 0).",
  javaSolution: `class Solution {
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int curr) {
        if (node == null) return 0;
        curr = curr * 10 + node.val;
        if (node.left == null && node.right == null) return curr; // leaf node
        return dfs(node.left, curr) + dfs(node.right, curr);
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. Multiply the running total by 10 and add the current digit.\n2. When you hit a leaf, return that full number.\n3. Add up the numbers from all leaves.",
  hints: ["curr = curr * 10 + node.val", "Base case leaf node returns curr", "Sum left and right recursive results"],
  interviewNotes: ["Accumulator parameter pattern (curr passed top-down)", "Node digits are always 0-9", "O(h) space on the recursion stack"],
  oneLineAnswer: "Accumulate running number top-down (curr * 10 + val); return curr at leaves and sum left and right subtrees.",
  edgeCases: ["Single node root", "Deep tree with potential integer considerations (fits standard 32-bit int per constraints)", "Skewed tree"],
  similar: [{id: 112, title: "Path Sum"}]
},
{
  id: 124, title: "Binary Tree Maximum Path Sum", topic: "Tree Traversal", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
  description: "A path in a binary tree is any sequence of nodes where each pair of adjacent nodes has an edge. Return the maximum path sum of any non-empty path.\n\nExample:\nInput: root = [-10,9,20,null,null,15,7]\nOutput: 42 (15 + 20 + 7)",
  intuition: "At each node, the max path that turns at this node is node.val + max(0, leftGain) + max(0, rightGain). But the value returned to the parent can only include ONE branch: node.val + max(0, max(leftGain, rightGain)).",
  approach: "1. Global variable maxSum initialized to Integer.MIN_VALUE.\n2. Helper maxGain(node):\n   - If node == null, return 0.\n   - left = max(0, maxGain(node.left)).\n   - right = max(0, maxGain(node.right)).\n   - Update maxSum = max(maxSum, node.val + left + right) (path turning at node).\n   - Return node.val + max(left, right) (path extending to parent).\n3. Return maxSum.",
  javaSolution: `class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }

    private int maxGain(TreeNode node) {
        if (node == null) return 0;
        // Ignore paths with negative sum by clamping to 0
        int left = Math.max(0, maxGain(node.left));
        int right = Math.max(0, maxGain(node.right));

        // Max path passing through this node as highest root of the path
        maxSum = Math.max(maxSum, node.val + left + right);

        // Return max contribution this node can give to its parent
        return node.val + Math.max(left, right);
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. For each node, find the best sum its left and right arms can provide (ignore if negative).\n2. Check if curving through this node (left + node + right) beats the global record.\n3. Return only ONE arm + node.val up to the parent (since a path cannot branch into two arms for the parent).",
  hints: ["Clamp negative child gains to 0", "Update global max with (node.val + left + right)", "Return node.val + max(left, right) to parent"],
  interviewNotes: ["Key distinction: a path can turn (use both children) locally, but when reporting up to its parent, it can only use ONE branch", "Must initialize maxSum to Integer.MIN_VALUE (all nodes can be negative)", "Legendary Hard interview question asked at Google/Meta"],
  oneLineAnswer: "Post-order DFS: update global max with node.val + left + right (turning path), but return node.val + max(left, right) to parent.",
  edgeCases: ["All negative numbers (returns largest negative node)", "Single node tree", "Path doesn't go through root"],
  similar: [{id: 543, title: "Diameter of Binary Tree"}]
},
{
  id: 236, title: "Lowest Common Ancestor of a Binary Tree", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
  description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.\n\nExample:\nInput: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\nOutput: 3",
  intuition: "Post-order DFS: if current node is null, p, or q, return current node. Recurse left and right. If both left and right return non-null, current node is the LCA. If only one returns non-null, propagate that non-null node upwards.",
  approach: "1. If root == null || root == p || root == q, return root.\n2. left = lowestCommonAncestor(root.left, p, q).\n3. right = lowestCommonAncestor(root.right, p, q).\n4. If left != null && right != null, root is the LCA -> return root.\n5. Return left != null ? left : right.",
  javaSolution: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // If p and q are found in different subtrees, root is their LCA
        if (left != null && right != null) return root;

        // Otherwise return the subtree that contains at least one target
        return (left != null) ? left : right;
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. Search down left and right subtrees for p or q.\n2. If both sides find someone, this current node is the split point (LCA)!\n3. If only one side found a target, pass that target up to parent.",
  hints: ["Base cases: root == null, root == p, root == q", "If left and right both non-null, root is LCA", "Otherwise propagate the non-null child"],
  interviewNotes: ["Guaranteed both p and q exist in tree", "If one target is an ancestor of the other, the ancestor is found first and returned before ever recursing deeper", "Standard FAANG tree question"],
  oneLineAnswer: "DFS: if root is null, p, or q return root; if both subtrees return non-null, root is LCA; else return the non-null child.",
  edgeCases: ["p is ancestor of q (returns p)", "p and q in left and right subtrees", "Root itself is p or q"],
  similar: [{id: 235, title: "Lowest Common Ancestor of a BST"}]
},
{
  id: 199, title: "Binary Tree Right Side View", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
  description: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.\n\nExample:\nInput: root = [1,2,3,null,5,null,4]\nOutput: [1,3,4]",
  intuition: "Level-order traversal (BFS): the right side view consists of the last node of each level. Alternatively, reverse pre-order DFS (visit right before left), adding the first node encountered at each depth.",
  approach: "1. Use BFS with a Queue.\n2. For each level: record levelSize. Loop through levelSize nodes.\n3. The last node in this loop (i == levelSize - 1) is added to result.\n4. Add left and right children to queue.\n5. Return result list.",
  javaSolution: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();
                if (i == size - 1) res.add(curr.val); // last node on current level
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
        }
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(w) where w is max width of tree" },
  simpleExplanation: "1. Walk level-by-level using BFS.\n2. For each floor, take the very last person standing on the right.\n3. Add to the answer.",
  hints: ["Level order traversal (BFS)", "Last node in each level queue loop", "DFS alternative: visit root -> right -> left and check depth == res.size()"],
  interviewNotes: ["BFS is intuitive because it processes level-by-level", "DFS alternative: root -> right -> left, adding node if depth == list.size() takes O(h) space", "Remember that a left child can be visible from the right if no right child exists"],
  oneLineAnswer: "BFS level-order traversal taking the last node of each level.",
  edgeCases: ["Empty tree: empty list", "Tree skewed to the left: all left nodes are visible", "Single node"],
  similar: [{id: 102, title: "Binary Tree Level Order Traversal"}]
},
{
  id: 637, title: "Average of Levels in Binary Tree", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/average-of-levels-in-binary-tree/",
  description: "Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.\n\nExample:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [3.00000, 14.50000, 11.00000]",
  intuition: "Standard BFS level-order traversal. For each level, compute the sum of all node values and divide by level size. Use double for sum to prevent 32-bit integer overflow.",
  approach: "1. BFS queue initialized with root.\n2. While queue is not empty:\n   - size = queue.size(), sum = 0.0.\n   - For size times: poll node, sum += node.val, enqueue non-null children.\n   - res.add(sum / size).\n3. Return res.",
  javaSolution: `class Solution {
    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int size = q.size();
            double sum = 0;
            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();
                sum += curr.val;
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
            res.add(sum / size);
        }
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(w) max level width" },
  simpleExplanation: "1. Use BFS to process one tree level at a time.\n2. Sum up all node values on that level using a double.\n3. Divide by the count of nodes on that level and store the average.",
  hints: ["Level order BFS", "Use double for sum to avoid integer overflow", "res.add(sum / size) per level"],
  interviewNotes: ["Watch out for integer overflow: multiple nodes with Integer.MAX_VALUE will overflow an int sum -> use double", "Classic BFS template problem", "Queue size must be saved in a variable before the loop"],
  oneLineAnswer: "BFS level-order traversal, summing node values on each level as doubles and dividing by level size.",
  edgeCases: ["Nodes with Integer.MAX_VALUE or MIN_VALUE", "Single node", "Deep tree"],
  similar: [{id: 102, title: "Binary Tree Level Order Traversal"}]
},
{
  id: 102, title: "Binary Tree Level Order Traversal", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).\n\nExample:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]",
  intuition: "Queue-based BFS: store current level's nodes in a list, then enqueue all their children for the next level.",
  approach: "1. If root == null, return empty list.\n2. Queue<TreeNode> q with root.\n3. While q not empty:\n   - size = q.size(); level = new ArrayList<>().\n   - For size iterations: curr = q.poll(), level.add(curr.val), offer left and right children.\n   - res.add(level).\n4. Return res.",
  javaSolution: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>(size);
            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();
                level.add(curr.val);
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Put the root in a queue.\n2. For each level, record how many nodes are currently in the queue.\n3. Pull out that many nodes, record their values, and add their children for the next round.",
  hints: ["int size = q.size() locks in the current level count", "Process all nodes for current level in inner loop", "Queue holds next level"],
  interviewNotes: ["Must capture int size = q.size() before loop, because q.offer modifies size dynamically", "Standard BFS canonical template", "DFS alternative passes depth index into res.get(depth)"],
  oneLineAnswer: "Queue BFS: capture level size, poll all nodes of current level into a list, and enqueue their children.",
  edgeCases: ["Empty tree: []", "Single node: [[1]]", "Asymmetric trees"],
  similar: [{id: 103, title: "Binary Tree Zigzag Level Order Traversal"}, {id: 107, title: "Binary Tree Level Order Traversal II"}]
},
{
  id: 103, title: "Binary Tree Zigzag Level Order Traversal", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
  description: "Given the root of a binary tree, return the zigzag level order traversal (alternating left-to-right and right-to-left).\n\nExample:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[20,9],[15,7]]",
  intuition: "Same as level order traversal, but maintain a boolean leftToRight flag. When false, insert values at the front of the level list (or use a LinkedList with addFirst).",
  approach: "1. BFS with queue and boolean leftToRight = true.\n2. For each level:\n   - LinkedList<Integer> level.\n   - For size nodes: if leftToRight, level.add(val); else level.addFirst(val).\n   - Offer children to queue.\n3. leftToRight = !leftToRight; res.add(level).\n4. Return res.",
  javaSolution: `class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        boolean leftToRight = true;

        while (!q.isEmpty()) {
            int size = q.size();
            LinkedList<Integer> level = new LinkedList<>();
            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();
                if (leftToRight) level.add(curr.val);
                else level.addFirst(curr.val); // reverse insertion for zigzag
                if (curr.left != null) q.offer(curr.left);
                if (curr.right != null) q.offer(curr.right);
            }
            res.add(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(n)" },
  simpleExplanation: "1. Do standard level-by-level BFS.\n2. On even levels, add nodes left-to-right.\n3. On odd levels, add nodes to the front of the list (right-to-left).\n4. Flip the direction after each level.",
  hints: ["LinkedList.addFirst() allows O(1) front insertion", "Flip boolean leftToRight after each level", "Queue child insertion order stays left-to-right"],
  interviewNotes: ["Notice children are ALWAYS enqueued in standard left-then-right order; only the level collection order changes", "LinkedList addFirst gives O(1) front prepend", "Clean and readable variation of standard BFS"],
  oneLineAnswer: "Standard BFS level order, using LinkedList.addFirst when leftToRight flag is false to alternate direction.",
  edgeCases: ["Empty tree: []", "Single node", "Two levels only"],
  similar: [{id: 102, title: "Binary Tree Level Order Traversal"}]
},
{
  id: 530, title: "Minimum Absolute Difference in BST", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/minimum-absolute-difference-in-bst/",
  description: "Given the root of a Binary Search Tree (BST), return the minimum absolute difference between values of any two different nodes in the tree.\n\nExample:\nInput: root = [4,2,6,1,3]\nOutput: 1",
  intuition: "In-order traversal of a BST yields values in strictly sorted ascending order. The minimum difference must occur between two adjacent elements in this sorted sequence.",
  approach: "1. Maintain prev = null and minDiff = Integer.MAX_VALUE.\n2. In-order DFS (left, root, right):\n   - If prev != null: minDiff = min(minDiff, curr.val - prev.val).\n   - prev = curr.\n3. Return minDiff.",
  javaSolution: `class Solution {
    private int minDiff = Integer.MAX_VALUE;
    private TreeNode prev = null;

    public int getMinimumDifference(TreeNode root) {
        inorder(root);
        return minDiff;
    }

    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null) {
            minDiff = Math.min(minDiff, node.val - prev.val);
        }
        prev = node;
        inorder(node.right);
    }
}`,
  complexity: { time: "O(n)", space: "O(h) call stack" },
  simpleExplanation: "1. An in-order walk of a BST visits numbers from smallest to largest.\n2. Compare every number with the one right before it.\n3. The smallest gap between neighbors is your answer.",
  hints: ["BST in-order traversal gives sorted order", "Min difference is between adjacent elements in in-order", "Keep track of prev pointer"],
  interviewNotes: ["BST in-order traversal property is crucial: Left < Root < Right", "Tracking prev node avoids collecting all elements into a list", "O(h) auxiliary recursion stack"],
  oneLineAnswer: "In-order DFS compares each node with prev to find min difference in sorted order.",
  edgeCases: ["Only 2 nodes", "Tree with large values", "Skewed BST"],
  similar: [{id: 783, title: "Minimum Distance Between BST Nodes"}, {id: 230, title: "Kth Smallest Element in a BST"}]
},
{
  id: 230, title: "Kth Smallest Element in a BST", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
  description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.\n\nExample:\nInput: root = [3,1,4,null,2], k = 1\nOutput: 1",
  intuition: "In-order traversal visits BST elements in ascending order. Stop and return as soon as the in-order counter reaches k.",
  approach: "1. Use iterative in-order traversal with a stack.\n2. Push all left nodes.\n3. Pop node, decrement k.\n4. If k == 0, return popped node.val.\n5. Advance to node.right.",
  javaSolution: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;

        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            if (--k == 0) return curr.val; // kth smallest reached
            curr = curr.right;
        }
        return -1;
    }
}`,
  complexity: { time: "O(h + k)", space: "O(h)" },
  simpleExplanation: "1. Walk down the left spine to the smallest number.\n2. Pop numbers one by one in ascending order.\n3. Count down k; when k reaches 0, you've found the answer.",
  hints: ["In-order traversal is sorted", "Iterative stack allows early exit at step k", "Do not traverse whole tree"],
  interviewNotes: ["Iterative in-order traversal allows early stopping at the kth node in O(h + k) time", "Follow-up: if BST is modified often and search is frequent, augment BST nodes with subtree size count for O(h) search", "1-indexed parameter"],
  oneLineAnswer: "Iterative in-order traversal with stack: stop and return the node value when count hits k in O(h + k) time.",
  edgeCases: ["k = 1: smallest element", "k = n: largest element", "Tree is a straight line"],
  similar: [{id: 94, title: "Binary Tree Inorder Traversal"}]
},
{
  id: 98, title: "Validate Binary Search Tree", topic: "Tree Traversal", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
  description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST). All left nodes must be strictly less than root, and all right nodes strictly greater.\n\nExample:\nInput: root = [2,1,3]\nOutput: true",
  intuition: "Every node must satisfy a valid range (min, max). Left child must be in (min, node.val), and right child must be in (node.val, max). Use Long.MIN_VALUE and Long.MAX_VALUE to handle edge cases with Integer.MIN_VALUE.",
  approach: "1. Helper validate(node, min, max):\n   - If node == null, return true.\n   - If node.val <= min || node.val >= max, return false.\n   - Return validate(node.left, min, node.val) && validate(node.right, node.val, max).\n2. Call with Long.MIN_VALUE and Long.MAX_VALUE.",
  javaSolution: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        // Node must strictly lie within (min, max)
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}`,
  complexity: { time: "O(n)", space: "O(h)" },
  simpleExplanation: "1. Pass down allowed boundaries (min and max) for each node.\n2. Going left sets a new ceiling (max = current value).\n3. Going right sets a new floor (min = current value).\n4. If any node breaches its allowed range, it's invalid.",
  hints: ["Just checking left < root and right > root is NOT enough — whole subtrees must obey bounds", "Use Long to avoid Integer.MIN_VALUE/MAX_VALUE overflow", "Strict inequalities: <= min or >= max are invalid"],
  interviewNotes: ["Classic trap: checking only parent-child relations fails on trees where a right-subtree grandchild is smaller than root", "Use Long boundaries to handle Integer.MAX_VALUE nodes", "In-order traversal strictly increasing check is an alternative"],
  oneLineAnswer: "Recursively check that each node value strictly falls within (min, max) bounds updated at each branch.",
  edgeCases: ["Node with Integer.MIN_VALUE or MAX_VALUE", "Duplicate values (invalid in strict BST)", "Single node tree"],
  similar: [{id: 94, title: "Binary Tree Inorder Traversal"}]
},
{
  id: 108, title: "Convert Sorted Array to Binary Search Tree", topic: "Tree Traversal", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
  description: "Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.\n\nExample:\nInput: nums = [-10,-3,0,5,9]\nOutput: [0,-3,9,-10,null,5]",
  intuition: "To achieve height-balance, pick the middle element of the sorted array as the root. Recursively convert the left half into the left subtree and the right half into the right subtree.",
  approach: "1. Helper build(nums, l, r):\n   - If l > r, return null.\n   - mid = l + (r - l) / 2.\n   - root = new TreeNode(nums[mid]).\n   - root.left = build(nums, l, mid - 1).\n   - root.right = build(nums, mid + 1, r).\n   - Return root.\n2. Call build(nums, 0, nums.length - 1).",
  javaSolution: `class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }

    private TreeNode build(int[] nums, int l, int r) {
        if (l > r) return null;
        int mid = l + (r - l) / 2;
        TreeNode root = new TreeNode(nums[mid]); // middle element ensures balance
        root.left = build(nums, l, mid - 1);
        root.right = build(nums, mid + 1, r);
        return root;
    }
}`,
  complexity: { time: "O(n)", space: "O(log n) recursion stack" },
  simpleExplanation: "1. Pick the middle element of the array to be the root (this keeps the tree balanced).\n2. Left half of array forms the left subtree.\n3. Right half forms the right subtree. Recurse.",
  hints: ["Divide and conquer", "Pick mid = (l + r) / 2 as root", "Binary search like splitting"],
  interviewNotes: ["Height balance is guaranteed because subtrees differ in size by at most 1", "Identical to binary search splitting", "Clean O(n) construction"],
  oneLineAnswer: "Choose middle element as root and recursively build left and right subtrees from array halves.",
  edgeCases: ["Single element array", "Two element array", "Odd vs even length arrays"],
  similar: [{id: 109, title: "Convert Sorted List to Binary Search Tree"}]
},

// ─── BIT MANIPULATION ───────────────────────────────────────────────────────
{
  id: 222, title: "Count Complete Tree Nodes", topic: "Bit Manipulation", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/count-complete-tree-nodes/",
  description: "Given the root of a complete binary tree, count the number of nodes in less than O(n) time.\n\nExample:\nInput: root = [1,2,3,4,5,6]\nOutput: 6",
  intuition: "Compare the left-most depth and right-most depth. If they are equal, the tree is a full binary tree with (2^h - 1) nodes (computed in O(1) via 1 << h). If not, recurse 1 + countNodes(left) + countNodes(right). One branch is guaranteed to be full at each step.",
  approach: "1. Measure leftHeight (following only left pointers).\n2. Measure rightHeight (following only right pointers).\n3. If leftHeight == rightHeight, return (1 << leftHeight) - 1.\n4. Else return 1 + countNodes(root.left) + countNodes(root.right).",
  javaSolution: `class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int leftH = 0, rightH = 0;
        TreeNode l = root, r = root;
        while (l != null) { leftH++; l = l.left; }
        while (r != null) { rightH++; r = r.right; }

        // If left and right depths match, it's a full perfect tree
        if (leftH == rightH) return (1 << leftH) - 1;

        // Otherwise recurse: at least one subtree will be full
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,
  complexity: { time: "O(log² n)", space: "O(log n)" },
  simpleExplanation: "1. Measure depth along the leftmost and rightmost edges.\n2. If they match, it's a perfect triangle: node count is 2^height - 1.\n3. If they don't match, recurse on left and right subtrees (one of them will be a perfect triangle!).",
  hints: ["Complete binary tree property", "Full tree formula: (1 << height) - 1", "O(log² n) time: height is log n, recursion depth is log n"],
  interviewNotes: ["O(log² n) beats standard O(n) traversal", "(1 << h) - 1 uses bit shift for fast 2^h calculation", "At each step, one of the two subtrees is guaranteed to be full"],
  oneLineAnswer: "If leftmost and rightmost depths match, return (1 << depth) - 1; else recursively return 1 + count(left) + count(right) in O(log² n).",
  edgeCases: ["Empty tree: 0", "Full tree (all levels full)", "Only 1 node"],
  similar: []
},
{
  id: 67, title: "Add Binary", topic: "Bit Manipulation", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/add-binary/",
  description: "Given two binary strings a and b, return their sum as a binary string.\n\nExample:\nInput: a = '11', b = '1'\nOutput: '100'",
  intuition: "Add from right to left using two pointers and a carry bit (similar to elementary addition in base 2). Append sum % 2, and carry = sum / 2.",
  approach: "1. Pointers i = a.length() - 1, j = b.length() - 1, carry = 0.\n2. While i >= 0 || j >= 0 || carry != 0:\n   - sum = carry + a[i] + b[j].\n   - carry = sum / 2.\n   - sb.append(sum % 2).\n3. Reverse sb and return.",
  javaSolution: `class Solution {
    public String addBinary(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int i = a.length() - 1, j = b.length() - 1, carry = 0;

        while (i >= 0 || j >= 0 || carry != 0) {
            int sum = carry;
            if (i >= 0) sum += a.charAt(i--) - '0';
            if (j >= 0) sum += b.charAt(j--) - '0';
            sb.append(sum % 2);
            carry = sum / 2;
        }
        return sb.reverse().toString();
    }
}`,
  complexity: { time: "O(max(n, m))", space: "O(max(n, m))" },
  simpleExplanation: "1. Add matching bits starting from the right.\n2. sum % 2 gives the current bit (0 or 1).\n3. sum / 2 gives the carry.\n4. Reverse the result string at the end.",
  hints: ["sum % 2 and carry = sum / 2", "Loop while i >= 0 || j >= 0 || carry != 0", "StringBuilder.reverse()"],
  interviewNotes: ["Never convert strings to integers with Integer.parseInt(..., 2) because strings can be up to 10,000 chars and will overflow", "Identical template to Add Strings and Add Two Numbers", "Base 2 addition arithmetic"],
  oneLineAnswer: "Right-to-left addition with carry using sum % 2 for bit and sum / 2 for carry, then reverse StringBuilder.",
  edgeCases: ["Unequal length strings", "Leading zeros", "Carry creates an extra leading bit (e.g., '1' + '1' = '10')"],
  similar: [{id: 415, title: "Add Strings"}, {id: 2, title: "Add Two Numbers"}]
},
{
  id: 190, title: "Reverse Bits", topic: "Bit Manipulation", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/reverse-bits/",
  description: "Reverse bits of a given 32 bits unsigned integer.\n\nExample:\nInput: n = 00000010100101000001111010011100\nOutput: 964176192 (00111001011110000010100101000000)",
  intuition: "Shift result left by 1 and append the least significant bit of n (n & 1). Shift n right by 1. Repeat 32 times.",
  approach: "1. res = 0.\n2. Loop 32 times:\n   - res = (res << 1) | (n & 1).\n   - n >>>= 1 (logical right shift to handle signed/unsigned).\n3. Return res.",
  javaSolution: `public class Solution {
    public int reverseBits(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1); // shift result left and attach lowest bit of n
            n >>>= 1;                   // logical shift right to handle negative sign bit
        }
        return res;
    }
}`,
  complexity: { time: "O(1) (fixed 32 loops)", space: "O(1)" },
  simpleExplanation: "1. Loop 32 times (for 32 bits).\n2. Pull the rightmost bit off n.\n3. Push it onto the right side of your result.\n4. Slide everything over.",
  hints: ["Loop exactly 32 times", "Use >>> (unsigned logical shift) instead of >>", "(res << 1) | (n & 1)"],
  interviewNotes: ["Must use >>> (logical unsigned shift) instead of >> (arithmetic shift) to avoid sign-extension bugs in Java", "Follow-up optimization: byte-level lookup table (caching reversed bytes) for repeated calls", "Standard bit twiddling problem"],
  oneLineAnswer: "Loop 32 times: shift result left, OR with (n & 1), and unsigned shift n right with >>>= 1.",
  edgeCases: ["n has leading zeros", "All bits 1 (-1 in 32-bit signed int)", "Powers of 2"],
  similar: [{id: 191, title: "Number of 1 Bits"}]
},
{
  id: 191, title: "Number of 1 Bits", topic: "Bit Manipulation", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/",
  description: "Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (Hamming weight).\n\nExample:\nInput: n = 11 (binary 1011)\nOutput: 3",
  intuition: "Brian Kernighan's Algorithm: n & (n - 1) flips the lowest set bit of n to 0. Count how many times we can perform this operation until n becomes 0.",
  approach: "1. count = 0.\n2. While n != 0:\n   - n &= (n - 1) (clears lowest set bit).\n   - count++.\n3. Return count.",
  javaSolution: `public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // clears the lowest set bit
            count++;
        }
        return count;
    }
}`,
  complexity: { time: "O(k) where k is number of 1-bits (at most 32)", space: "O(1)" },
  simpleExplanation: "1. The trick n & (n - 1) always wipes out the rightmost '1' bit.\n2. Count how many wipes it takes until the number reaches 0.\n3. That count is the number of 1-bits.",
  hints: ["Brian Kernighan's bit trick: n & (n - 1)", "Only runs for the number of SET bits, not all 32 bits", "Loop while n != 0"],
  interviewNotes: ["Brian Kernighan's algorithm is faster than looping 32 times because it only iterates over set bits", "Java has Integer.bitCount(n), but implement manual solution in interviews", "Works for negative numbers in Java"],
  oneLineAnswer: "Brian Kernighan's trick: repeatedly clear the lowest set bit via n &= (n - 1) and count iterations.",
  edgeCases: ["n = 0: 0 bits", "n has all 32 bits set: 32", "Powers of 2: exactly 1 iteration"],
  similar: [{id: 338, title: "Counting Bits"}]
},
{
  id: 136, title: "Single Number", topic: "Bit Manipulation", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/single-number/",
  description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one in O(n) time and O(1) space.\n\nExample:\nInput: nums = [4,1,2,1,2]\nOutput: 4",
  intuition: "XOR properties: a ^ a = 0, a ^ 0 = a, and XOR is commutative/associative. XORing all numbers cancels out all pairs, leaving only the unique number.",
  approach: "1. res = 0.\n2. For each num in nums: res ^= num.\n3. Return res.",
  javaSolution: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int x : nums) {
            res ^= x; // duplicate pairs cancel to 0; single remains
        }
        return res;
    }
}`,
  complexity: { time: "O(n)", space: "O(1)" },
  simpleExplanation: "1. XORing a number with itself cancels it out to 0 (a ^ a = 0).\n2. XORing all numbers together cancels every duplicate pair.\n3. The only number left standing is the single unique number.",
  hints: ["XOR: x ^ x = 0 and x ^ 0 = x", "XOR is commutative and associative", "O(1) space without HashSets"],
  interviewNotes: ["The textbook XOR problem", "Fails if elements appear 3 times (see Single Number II)", "Guaranteed O(n) time and true O(1) space"],
  oneLineAnswer: "XOR all numbers together; duplicate pairs cancel to 0, leaving the single unique number.",
  edgeCases: ["Single element array", "Negative numbers", "Single number at start/end of array"],
  similar: [{id: 137, title: "Single Number II"}, {id: 260, title: "Single Number III"}]
},
{
  id: 137, title: "Single Number II", topic: "Bit Manipulation", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/single-number-ii/",
  description: "Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element in O(n) time and O(1) space.\n\nExample:\nInput: nums = [2,2,3,2]\nOutput: 3",
  intuition: "For each of the 32 bit positions, sum the bits of all numbers. If a bit position sum is not a multiple of 3, the unique number must have that bit set.",
  approach: "1. res = 0.\n2. For bit i from 0 to 31:\n   - Count how many numbers in nums have bit i set: sum = 0.\n   - For each num: if ((num >> i) & 1) == 1, sum++.\n   - If (sum % 3) != 0, set bit i in res: res |= (1 << i).\n3. Return res.",
  javaSolution: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int sum = 0;
            for (int x : nums) {
                if (((x >> i) & 1) == 1) sum++;
            }
            // Bits contributed by triplets sum to multiples of 3
            if (sum % 3 != 0) {
                res |= (1 << i);
            }
        }
        return res;
    }
}`,
  complexity: { time: "O(32 * n) = O(n)", space: "O(1)" },
  simpleExplanation: "1. Check each of the 32 bit columns across all numbers.\n2. Numbers appearing 3 times will contribute a multiple of 3 to every bit column.\n3. If any column's sum is not divisible by 3, that bit belongs to the single unique number.",
  hints: ["Sum bits at position i across all numbers", "Modulo sum by 3", "Assemble result with bitwise OR"],
  interviewNotes: ["Generalizes to elements appearing k times: sum % k", "Digital logic gate state machine (ones, twos) achieves 1 pass O(n)", "Bit-counting method is easiest to explain and code cleanly"],
  oneLineAnswer: "Sum bits at each of the 32 positions across all numbers; if sum % 3 != 0, set that bit in the result.",
  edgeCases: ["Single element array", "Unique number is negative", "All other elements negative"],
  similar: [{id: 136, title: "Single Number"}]
},
{
  id: 201, title: "Bitwise AND of Numbers Range", topic: "Bit Manipulation", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
  description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.\n\nExample:\nInput: left = 5, right = 7\nOutput: 4",
  intuition: "In any range of numbers, lower bits flip frequently between 0 and 1, so their AND is always 0. The result is simply the common binary prefix of left and right, with all remaining lower bits zeroed.",
  approach: "1. shift = 0.\n2. While left < right:\n   - left >>= 1; right >>= 1; shift++.\n3. Return left << shift.",
  javaSolution: `class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int shift = 0;
        // Shift right until left and right share the common prefix
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        return left << shift; // pad common prefix with trailing zeros
    }
}`,
  complexity: { time: "O(log(right)) = O(32) = O(1)", space: "O(1)" },
  simpleExplanation: "1. As numbers increase, their rightmost bits constantly flip back and forth between 0 and 1.\n2. Any flipping bit turns to 0 when ANDed.\n3. Find the matching prefix between left and right, and fill the rest with zeros.",
  hints: ["Result is the common binary prefix of left and right", "Shift right until left == right", "Shift left back to restore position"],
  interviewNotes: ["Alternative Brian Kernighan trick: while (right > left) right &= (right - 1)", "Loop runs at most 32 times", "Brute-force loop TLEs on large ranges like [1, 2147483647]"],
  oneLineAnswer: "Find the common binary prefix of left and right by shifting right until they match, then shift left back.",
  edgeCases: ["left == right: return left", "left == 0: return 0", "left and right have different bit lengths -> 0"],
  similar: []
},

// ─── BREADTH-FIRST SEARCH ───────────────────────────────────────────────────
{
  id: 133, title: "Clone Graph", topic: "Breadth-First Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
  description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nExample:\nInput: adjList = [[2,4],[1,3],[2,4],[1,3]]\nOutput: cloned graph",
  intuition: "Graph traversal (BFS/DFS) with a HashMap to map each original node to its clone. This handles graph cycles and ensures each node is cloned exactly once.",
  approach: "1. If node == null, return null.\n2. Map<Node, Node> visited: original -> clone.\n3. BFS queue initialized with node. Create clone for start node.\n4. While queue not empty:\n   - curr = q.poll().\n   - For each neighbor n of curr:\n     - If n not in visited: create clone, visited.put(n, clone), q.offer(n).\n     - visited.get(curr).neighbors.add(visited.get(n)).\n5. Return visited.get(node).",
  javaSolution: `class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        Map<Node, Node> map = new HashMap<>(); // original -> clone
        Queue<Node> q = new ArrayDeque<>();

        map.put(node, new Node(node.val));
        q.offer(node);

        while (!q.isEmpty()) {
            Node curr = q.poll();
            for (Node neighbor : curr.neighbors) {
                if (!map.containsKey(neighbor)) {
                    map.put(neighbor, new Node(neighbor.val));
                    q.offer(neighbor);
                }
                // Connect cloned neighbor to cloned current node
                map.get(curr).neighbors.add(map.get(neighbor));
            }
        }
        return map.get(node);
    }
}`,
  complexity: { time: "O(V + E)", space: "O(V)" },
  simpleExplanation: "1. Use a HashMap to remember cloned nodes so you don't clone the same node twice.\n2. Explore using BFS.\n3. Whenever you see a neighbor, clone it if new, and wire up the neighbor connection on the clone.",
  hints: ["HashMap<Node, Node> tracks visited clones", "BFS with queue", "Wire cloned neighbors together"],
  interviewNotes: ["Cycle detection: checking map.containsKey() prevents infinite loops on undirected graphs", "Can also be written cleanly with recursive DFS", "Canonical graph cloning problem"],
  oneLineAnswer: "BFS/DFS using HashMap mapping original to clone to duplicate nodes and wire edges while preventing cycles.",
  edgeCases: ["Empty graph (node == null): null", "Single node with no neighbors", "Graph with self-loops"],
  similar: [{id: 138, title: "Copy List with Random Pointer"}]
},
{
  id: 433, title: "Minimum Genetic Mutation", topic: "Breadth-First Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/minimum-genetic-mutation/",
  description: "A gene string is 8 characters long from ['A', 'C', 'G', 'T']. Find the minimum number of mutations to transform startGene to endGene where each mutation must be in bank. If impossible, return -1.\n\nExample:\nInput: startGene = 'AACCGGTT', endGene = 'AACCGGTA', bank = ['AACCGGTA']\nOutput: 1",
  intuition: "Shortest transformation path = BFS. Put bank in a HashSet. At each step, mutate each of the 8 characters to 'A', 'C', 'G', 'T'. If the mutated string is in bank, enqueue it and remove from bank (marking visited).",
  approach: "1. Set<String> bankSet = new HashSet<>(Arrays.asList(bank)). If !bankSet.contains(endGene), return -1.\n2. Queue<String> q with startGene; mutations = 0.\n3. While q not empty:\n   - For size nodes:\n     - curr = q.poll(). If curr.equals(endGene), return mutations.\n     - Try all 4 characters at each of the 8 positions.\n     - If mutated in bankSet: q.offer(mutated), bankSet.remove(mutated).\n   - mutations++.\n4. Return -1.",
  javaSolution: `class Solution {
    public int minMutation(String startGene, String endGene, String[] bank) {
        Set<String> bankSet = new HashSet<>(Arrays.asList(bank));
        if (!bankSet.contains(endGene)) return -1;

        char[] genes = {'A', 'C', 'G', 'T'};
        Queue<String> q = new ArrayDeque<>();
        q.offer(startGene);
        int steps = 0;

        while (!q.isEmpty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                String curr = q.poll();
                if (curr.equals(endGene)) return steps;

                char[] arr = curr.toCharArray();
                for (int i = 0; i < arr.length; i++) {
                    char old = arr[i];
                    for (char g : genes) {
                        if (g == old) continue;
                        arr[i] = g;
                        String next = new String(arr);
                        if (bankSet.contains(next)) {
                            q.offer(next);
                            bankSet.remove(next); // mark visited
                        }
                    }
                    arr[i] = old; // backtrack char
                }
            }
            steps++;
        }
        return -1;
    }
}`,
  complexity: { time: "O(B * 8 * 4) = O(B) where B is bank size", space: "O(B)" },
  simpleExplanation: "1. Use BFS to find the shortest path.\n2. For the current gene, mutate each letter to A, C, G, T.\n3. If that mutated gene is in the bank, add it to the queue and delete it from the bank (so you don't visit it again).\n4. Count the number of steps.",
  hints: ["Unweighted shortest path = BFS", "Remove from bankSet to mark visited", "Test 4 gene replacements at each of the 8 indices"],
  interviewNotes: ["Identical pattern to Word Ladder, but with a fixed alphabet of 4 characters and length 8", "Removing from bankSet avoids an extra visited set", "Early exit if endGene is not in the bank"],
  oneLineAnswer: "BFS generating all 1-character gene mutations in bank, removing visited genes until endGene is reached.",
  edgeCases: ["endGene not in bank -> return -1", "startGene == endGene -> 0", "No mutation path exists"],
  similar: [{id: 127, title: "Word Ladder"}]
},
{
  id: 127, title: "Word Ladder", topic: "Breadth-First Search", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
  description: "Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, changing one letter at a time with each intermediate word in wordList. Return 0 if impossible.\n\nExample:\nInput: beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']\nOutput: 5 ('hit' -> 'hot' -> 'dot' -> 'dog' -> 'cog')",
  intuition: "Shortest path in unweighted graph = BFS. Two-end BFS (bidirectional BFS) dramatically cuts the search space from b^d to 2 * b^(d/2). Alternatively, standard BFS starting from beginWord.",
  approach: "1. Put wordList into a HashSet. If !set.contains(endWord), return 0.\n2. Bidirectional BFS: beginSet and endSet.\n3. Expand the smaller set at each step: for each word, mutate each char from 'a' to 'z'.\n4. If mutated word in opposite set, return steps + 1.\n5. If in wordSet, add to nextSet and remove from wordSet.\n6. Swap beginSet and nextSet.",
  javaSolution: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;

        Set<String> beginSet = new HashSet<>();
        Set<String> endSet = new HashSet<>();
        beginSet.add(beginWord);
        endSet.add(endWord);

        int level = 1;

        while (!beginSet.isEmpty() && !endSet.isEmpty()) {
            // Always expand the smaller frontier to minimize branching
            if (beginSet.size() > endSet.size()) {
                Set<String> swap = beginSet; beginSet = endSet; endSet = swap;
            }

            Set<String> nextSet = new HashSet<>();
            for (String word : beginSet) {
                char[] chars = word.toCharArray();
                for (int i = 0; i < chars.length; i++) {
                    char old = chars[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        chars[i] = c;
                        String next = new String(chars);

                        if (endSet.contains(next)) return level + 1; // frontiers meet!

                        if (wordSet.contains(next)) {
                            nextSet.add(next);
                            wordSet.remove(next);
                        }
                    }
                    chars[i] = old;
                }
            }
            beginSet = nextSet;
            level++;
        }
        return 0;
    }
}`,
  complexity: { time: "O(M² * N) where M is word length, N is list size", space: "O(M * N)" },
  simpleExplanation: "1. Search from BOTH ends at once (bidirectional BFS).\n2. Expand whichever side is smaller.\n3. Mutate each letter from 'a' to 'z'.\n4. When the two expanding searches touch, you've found the shortest word ladder.",
  hints: ["Bidirectional BFS is much faster than standard BFS", "Always expand the smaller set", "Remove visited words from wordSet"],
  interviewNotes: ["Bidirectional BFS reduces time complexity from O(b^d) to O(b^(d/2)), passing LeetCode with top 95% speed", "Return level + 1 because the answer counts total words, not edge transitions", "Classic tier-1 interview problem"],
  oneLineAnswer: "Bidirectional BFS expanding from both beginWord and endWord, mutating each character 'a'-'z' until the frontiers intersect.",
  edgeCases: ["endWord not in wordList: return 0", "No possible transformation path", "beginWord already adjacent to endWord"],
  similar: [{id: 126, title: "Word Ladder II"}, {id: 433, title: "Minimum Genetic Mutation"}]
},
{
  id: 322, title: "Coin Change", topic: "Breadth-First Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/coin-change/",
  description: "You are given an integer array coins and target amount. Return the fewest number of coins that you need to make up that amount, or -1 if impossible.\n\nExample:\nInput: coins = [1,2,5], amount = 11\nOutput: 3 (5 + 5 + 1)",
  intuition: "Bottom-up DP: dp[i] is min coins needed for amount i. For each coin c, dp[i] = min(dp[i], dp[i - c] + 1). (Can also be viewed as shortest path BFS on a graph of amounts).",
  approach: "1. dp array of size amount + 1 filled with amount + 1.\n2. dp[0] = 0.\n3. For i from 1 to amount:\n   - For each coin c in coins:\n     - If i - c >= 0: dp[i] = min(dp[i], dp[i - c] + 1).\n4. Return dp[amount] > amount ? -1 : dp[amount].",
  javaSolution: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0; // 0 coins needed for amount 0

        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) {
                    dp[i] = Math.min(dp[i], dp[i - c] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
  complexity: { time: "O(amount * coins.length)", space: "O(amount)" },
  simpleExplanation: "1. Build an array dp where dp[i] is the minimum coins to make amount i.\n2. Start with dp[0] = 0.\n3. For each amount, try using each coin and take 1 + whatever was needed for the remainder.\n4. If the target is still unreachable, return -1.",
  hints: ["Unbounded knapsack DP pattern", "Initialize dp with amount + 1 (sentinel value)", "dp[i] = min(dp[i], dp[i - coin] + 1)"],
  interviewNotes: ["Notice we fill with amount + 1 instead of Integer.MAX_VALUE to prevent integer overflow when adding 1", "Greedy approach fails on coin systems like [1, 3, 4] with amount 6 (greedy picks 4+1+1=3, optimal is 3+3=2)", "DP or BFS shortest path"],
  oneLineAnswer: "Bottom-up DP: dp[i] = min(dp[i], dp[i - c] + 1) initialized with amount + 1 sentinel.",
  edgeCases: ["amount = 0: return 0", "Amount cannot be formed: return -1", "Coin larger than amount"],
  similar: [{id: 518, title: "Coin Change II"}, {id: 279, title: "Perfect Squares"}]
},

// ─── TOPOLOGICAL SORT ───────────────────────────────────────────────────────
{
  id: 207, title: "Course Schedule", topic: "Topological Sort", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
  description: "There are numCourses courses labeled from 0 to numCourses - 1. You are given prerequisites [a, b] (must take b before a). Return true if you can finish all courses.\n\nExample:\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: true",
  intuition: "Detecting if a directed graph has a cycle. Use Kahn's algorithm (indegree BFS): start with all nodes having indegree 0. Remove them and decrement neighbor indegrees. If all courses are processed, no cycle exists.",
  approach: "1. Build adjacency list and indegree array.\n2. Enqueue all courses with indegree == 0.\n3. Count processed courses.\n4. While queue not empty: poll course, increment count, decrement indegree of all neighbors. If neighbor indegree hits 0, enqueue it.\n5. Return count == numCourses.",
  javaSolution: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];

        // Build directed graph: b -> a
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }

        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }

        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            for (int next : adj.get(curr)) {
                if (--inDegree[next] == 0) q.offer(next);
            }
        }
        return count == numCourses; // true if no cycles
    }
}`,
  complexity: { time: "O(V + E)", space: "O(V + E)" },
  simpleExplanation: "1. Count how many prerequisites each course has (indegree).\n2. Take all courses that have 0 prerequisites.\n3. When you finish a course, reduce the prerequisite count of dependent courses.\n4. If you managed to finish every course, return true.",
  hints: ["Cycle detection in directed graph", "Kahn's Algorithm (indegree BFS)", "Enqueue nodes with indegree == 0"],
  interviewNotes: ["Directed cycle = cannot finish courses", "Kahn's algorithm using inDegree is cleaner than 3-color DFS for interviews", "Prerequisite [a, b] means directed edge b -> a"],
  oneLineAnswer: "Kahn's algorithm: enqueue courses with indegree 0, decrement neighbor indegrees as courses are completed; return count == numCourses.",
  edgeCases: ["No prerequisites: true", "Mutual dependency [0, 1] and [1, 0]: false (cycle)", "Self dependency [0, 0]: false"],
  similar: [{id: 210, title: "Course Schedule II"}, {id: 269, title: "Alien Dictionary"}]
},
{
  id: 210, title: "Course Schedule II", topic: "Topological Sort", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
  description: "Return the ordering of courses you should take to finish all courses. If impossible, return an empty array.\n\nExample:\nInput: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\nOutput: [0,2,1,3] or [0,1,2,3]",
  intuition: "Kahn's algorithm for Topological Sort. Record the order in which nodes are popped with indegree 0. If count processed == numCourses, return the order; else return empty array.",
  approach: "1. Build adjacency list and indegree array.\n2. Enqueue all courses with indegree == 0.\n3. order array of size numCourses, index = 0.\n4. While queue not empty: poll course, order[index++] = curr, decrement neighbors' indegrees, enqueue if 0.\n5. Return index == numCourses ? order : new int[0].",
  javaSolution: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];

        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }

        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }

        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            order[idx++] = curr;
            for (int next : adj.get(curr)) {
                if (--inDegree[next] == 0) q.offer(next);
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`,
  complexity: { time: "O(V + E)", space: "O(V + E)" },
  simpleExplanation: "1. Track prerequisites for each course.\n2. Take courses with 0 prerequisites and record them in an order list.\n3. Knock off prerequisites for dependent courses as you complete them.\n4. If you complete all courses, return the order list; otherwise return empty array.",
  hints: ["Same as Course Schedule I, but store popped elements in result array", "Check idx == numCourses at end", "Return empty array new int[0] on cycle"],
  interviewNotes: ["Direct extension of Course Schedule I", "Topological order is not necessarily unique; any valid topological ordering is accepted", "Cycle detection built-in: idx != numCourses"],
  oneLineAnswer: "Topological sort via Kahn's algorithm: collect 0-indegree courses in result array; return order if all completed, else empty array.",
  edgeCases: ["Cycle present: return []", "No prerequisites: return [0, 1, ..., n-1]", "Disjoint disconnected subgraphs"],
  similar: [{id: 207, title: "Course Schedule"}, {id: 269, title: "Alien Dictionary"}]
},

// ─── BACKTRACKING ───────────────────────────────────────────────────────────
{
  id: 17, title: "Letter Combinations of a Phone Number", topic: "Backtracking", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
  description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent according to telephone keypad mapping.\n\nExample:\nInput: digits = '23'\nOutput: ['ad','ae','af','bd','be','bf','cd','ce','cf']",
  intuition: "Backtracking / DFS: at each digit, branch over all letters mapped to that digit. When current combination length equals digits.length, add to result.",
  approach: "1. If digits.isEmpty(), return empty list.\n2. Map phone digits to letters: ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'].\n3. Helper backtrack(idx, sb):\n   - If sb.length() == digits.length(): res.add(sb.toString()), return.\n   - For each char in mapping of digits[idx]: sb.append(c), backtrack(idx + 1, sb), sb.deleteCharAt(last).\n4. Return res.",
  javaSolution: `class Solution {
    private static final String[] MAPPING = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits.isEmpty()) return res;
        backtrack(digits, 0, new StringBuilder(), res);
        return res;
    }

    private void backtrack(String digits, int idx, StringBuilder sb, List<String> res) {
        if (idx == digits.length()) {
            res.add(sb.toString());
            return;
        }
        String letters = MAPPING[digits.charAt(idx) - '0'];
        for (char c : letters.toCharArray()) {
            sb.append(c);
            backtrack(digits, idx + 1, sb, res);
            sb.deleteCharAt(sb.length() - 1); // backtrack
        }
    }
}`,
  complexity: { time: "O(4^n * n)", space: "O(n) recursion depth" },
  simpleExplanation: "1. For the first number, try its possible letters.\n2. For each letter, recurse to pick letters for the next number.\n3. When the word reaches full length, save it and backtrack to try other letters.",
  hints: ["Constant array mapping 0-9 to keypad strings", "Backtrack with StringBuilder", "Base case digits.isEmpty() return empty list"],
  interviewNotes: ["Notice the edge case: empty input string returns [] not ['']", "StringBuilder + deleteCharAt is standard Java backtracking pattern", "Max 4 choices per digit (7 and 9 have 4 letters)"],
  oneLineAnswer: "Backtrack through digits: loop over mapped keypad letters, append, recurse to next digit, and backtrack.",
  edgeCases: ["Empty string digits -> return []", "Single digit", "Digits 7 and 9 (4 letters each)"],
  similar: [{id: 22, title: "Generate Parentheses"}, {id: 46, title: "Permutations"}]
},
{
  id: 77, title: "Combinations", topic: "Backtracking", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/combinations/",
  description: "Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].\n\nExample:\nInput: n = 4, k = 2\nOutput: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
  intuition: "Standard combination backtracking. To avoid duplicate combinations, iterate numbers in increasing order starting from start. Prune when remaining numbers are insufficient to fill k.",
  approach: "1. Helper backtrack(start, k, path, res):\n   - If k == 0: res.add(new ArrayList<>(path)), return.\n   - For i from start to n - k + 1 (pruning):\n     - path.add(i).\n     - backtrack(i + 1, k - 1, path, res).\n     - path.remove(last).\n2. Call with start = 1.",
  javaSolution: `class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(1, n, k, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int start, int n, int k, List<Integer> path, List<List<Integer>> res) {
        if (k == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        // Pruning optimization: only loop if enough elements remain to form k
        for (int i = start; i <= n - k + 1; i++) {
            path.add(i);
            backtrack(i + 1, n, k - 1, path, res);
            path.remove(path.size() - 1); // backtrack
        }
    }
}`,
  complexity: { time: "O(k * C(n, k))", space: "O(k) recursion depth" },
  simpleExplanation: "1. Pick a number starting from 1 up to n.\n2. Recurse to pick remaining numbers from higher values only (to avoid duplicates).\n3. When you have k numbers, add to results and backtrack.",
  hints: ["start pointer ensures numbers are strictly increasing", "Prune loop: i <= n - k + 1", "new ArrayList<>(path) when adding to results"],
  interviewNotes: ["Loop pruning condition i <= n - k + 1 speeds up execution significantly", "Always create a defensive copy new ArrayList<>(path) when storing in result list", "Combination formula C(n, k)"],
  oneLineAnswer: "Backtrack numbers from start up to n - k + 1, collecting when k == 0 and pruning when remaining count is insufficient.",
  edgeCases: ["k == 1: all singletons", "k == n: single list [1..n]"],
  similar: [{id: 39, title: "Combination Sum"}, {id: 46, title: "Permutations"}]
},
{
  id: 46, title: "Permutations", topic: "Backtracking", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/permutations/",
  description: "Given an array nums of distinct integers, return all the possible permutations in any order.\n\nExample:\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
  intuition: "Backtracking with a boolean visited array (or in-place element swapping). At each position, try placing every unused number.",
  approach: "1. boolean[] used = new boolean[nums.length].\n2. Helper backtrack(path, used, res):\n   - If path.size() == nums.length: res.add(new ArrayList<>(path)), return.\n   - For i from 0 to nums.length - 1:\n     - If used[i], continue.\n     - used[i] = true; path.add(nums[i]).\n     - backtrack(path, used, res).\n     - path.remove(last); used[i] = false.",
  javaSolution: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.add(nums[i]);
            backtrack(nums, used, path, res);
            path.remove(path.size() - 1); // backtrack
            used[i] = false;
        }
    }
}`,
  complexity: { time: "O(n * n!)", space: "O(n)" },
  simpleExplanation: "1. Pick an unused number.\n2. Mark it as used and recurse to pick the next number.\n3. When all numbers are picked, save the permutation.\n4. Unmark it and try the next option.",
  hints: ["used[] boolean array tracks picked elements", "Base case path.size() == nums.length", "Total permutations = n!"],
  interviewNotes: ["Notice the difference from combinations: loop starts at 0 instead of start, with a boolean used array", "Can also be solved by swapping elements in-place in nums", "All input numbers are unique"],
  oneLineAnswer: "Backtrack through all indices using a boolean used array; collect path when path.size() == nums.length.",
  edgeCases: ["Single element: [[1]]", "Two elements", "Negative numbers included"],
  similar: [{id: 47, title: "Permutations II"}, {id: 77, title: "Combinations"}]
},
{
  id: 39, title: "Combination Sum", topic: "Backtracking", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
  description: "Given an array of distinct integers candidates and target, return all unique combinations where candidate numbers sum to target. The same number may be chosen unlimited times.\n\nExample:\nInput: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]",
  intuition: "Sort candidates for pruning. Backtrack starting from index i. Because elements can be reused unlimited times, recurse with same index i instead of i + 1.",
  approach: "1. Sort candidates.\n2. Helper backtrack(start, remain, path, res):\n   - If remain == 0: res.add(new ArrayList<>(path)), return.\n   - For i from start to candidates.length - 1:\n     - If candidates[i] > remain: break (sorted pruning!).\n     - path.add(candidates[i]).\n     - backtrack(i, remain - candidates[i], path, res) (reuse index i!).\n     - path.remove(last).",
  javaSolution: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(candidates); // sorting enables early pruning
        backtrack(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] candidates, int start, int remain, List<Integer> path, List<List<Integer>> res) {
        if (remain == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) break; // pruning: remaining candidates are even larger
            path.add(candidates[i]);
            // Recurse with 'i' (not i + 1) to allow unlimited reuse of current number
            backtrack(candidates, i, remain - candidates[i], path, res);
            path.remove(path.size() - 1); // backtrack
        }
    }
}`,
  complexity: { time: "O(2^target)", space: "O(target / min_candidate)" },
  simpleExplanation: "1. Sort candidates smallest to largest.\n2. Pick a number and subtract it from target.\n3. You are allowed to pick the same number again, so pass index i.\n4. If remaining target reaches 0, save the combination.",
  hints: ["Sort candidates first for early break", "Pass i (not i + 1) to allow reuse of current element", "start index prevents duplicate combinations"],
  interviewNotes: ["Passing i allows reusing current element; starting next search from i prevents duplicate permutations like [2,3] and [3,2]", "Sorting enables break instead of continue, speeding up runtime significantly", "All candidates are positive integers"],
  oneLineAnswer: "Sort array and backtrack: reuse index i while subtracting candidate from target; prune with break when candidate > remain.",
  edgeCases: ["Target cannot be formed", "Single candidate equals target", "Large target with small candidates"],
  similar: [{id: 40, title: "Combination Sum II"}, {id: 216, title: "Combination Sum III"}]
},
{
  id: 52, title: "N-Queens II", topic: "Backtracking", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/n-queens-ii/",
  description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return the number of distinct solutions.\n\nExample:\nInput: n = 4\nOutput: 2",
  intuition: "Place one queen per row. Track attacked columns and diagonals using boolean arrays or bitmasks. Diagonal indices: main diagonal = row - col + n, anti-diagonal = row + col.",
  approach: "1. Track cols[n], diag1[2n], diag2[2n].\n2. Helper backtrack(row):\n   - If row == n: return 1.\n   - count = 0.\n   - For col from 0 to n-1:\n     - d1 = row - col + n, d2 = row + col.\n     - If cols[col] || diag1[d1] || diag2[d2] continue.\n     - Mark true, count += backtrack(row + 1), unmark.\n   - Return count.",
  javaSolution: `class Solution {
    private boolean[] cols, diag1, diag2;

    public int totalNQueens(int n) {
        cols = new boolean[n];
        diag1 = new boolean[2 * n]; // row - col + n
        diag2 = new boolean[2 * n]; // row + col
        return backtrack(0, n);
    }

    private int backtrack(int row, int n) {
        if (row == n) return 1;
        int count = 0;
        for (int col = 0; col < n; col++) {
            int d1 = row - col + n;
            int d2 = row + col;
            if (cols[col] || diag1[d1] || diag2[d2]) continue;

            cols[col] = true; diag1[d1] = true; diag2[d2] = true;
            count += backtrack(row + 1, n);
            cols[col] = false; diag1[d1] = false; diag2[d2] = false; // backtrack
        }
        return count;
    }
}`,
  complexity: { time: "O(n!)", space: "O(n)" },
  simpleExplanation: "1. Place queens row-by-row.\n2. Keep boolean checks for which columns, diagonals, and anti-diagonals are threatened.\n3. When all n rows have a queen, count it as a valid solution.",
  hints: ["Main diagonal index: row - col + n", "Anti-diagonal index: row + col", "Place one queen per row"],
  interviewNotes: ["Notice the diagonal indexing math: row + col is constant for anti-diagonals, row - col + n is constant for main diagonals", "O(1) safety checks with boolean arrays beats scanning board", "Bit manipulation can represent the three boolean arrays in 3 integers"],
  oneLineAnswer: "Place queens row-by-row, tracking attacked columns and diagonals via boolean arrays (row-col+n, row+col) in O(n!) time.",
  edgeCases: ["n = 1: 1", "n = 2 or n = 3: 0 solutions", "n = 4: 2 solutions"],
  similar: [{id: 51, title: "N-Queens"}]
},
{
  id: 22, title: "Generate Parentheses", topic: "Backtracking", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
  description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\nExample:\nInput: n = 3\nOutput: ['((()))','(()())','(())()','()(())','()()()']",
  intuition: "Backtrack building the string. Can add '(' if open count < n. Can add ')' if close count < open count. When string length reaches 2 * n, a valid combination is formed.",
  approach: "1. Helper backtrack(open, close, n, sb, res):\n   - If sb.length() == 2 * n: res.add(sb.toString()), return.\n   - If open < n: sb.append('('), backtrack(open + 1, close), sb.deleteCharAt(last).\n   - If close < open: sb.append(')'), backtrack(open, close + 1), sb.deleteCharAt(last).",
  javaSolution: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(0, 0, n, new StringBuilder(), res);
        return res;
    }

    private void backtrack(int open, int close, int n, StringBuilder sb, List<String> res) {
        if (sb.length() == 2 * n) {
            res.add(sb.toString());
            return;
        }
        if (open < n) {
            sb.append('(');
            backtrack(open + 1, close, n, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
        if (close < open) { // can only close if there's an unmatched open bracket
            sb.append(')');
            backtrack(open, close + 1, n, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
  complexity: { time: "O(4^n / sqrt(n)) Catalan number", space: "O(n) recursion depth" },
  simpleExplanation: "1. Add '(' whenever you haven't used all n open brackets.\n2. Add ')' whenever there are more open brackets than closed brackets.\n3. When the string reaches 2 * n characters, save it.",
  hints: ["Keep track of open and close counts", "Can add '(' if open < n", "Can add ')' if close < open"],
  interviewNotes: ["Number of valid combinations is the nth Catalan number: C_n = (1 / (n+1)) * (2n choose n)", "Pruning invalid paths during construction is much faster than generating all 2^(2n) strings and validating", "Clean StringBuilder backtracking template"],
  oneLineAnswer: "Backtrack adding '(' when open < n and ')' when close < open until length is 2n.",
  edgeCases: ["n = 1: ['()']", "n = 0: empty list", "n = 8 (max constraint)"],
  similar: [{id: 20, title: "Valid Parentheses"}]
},
{
  id: 79, title: "Word Search", topic: "Backtracking", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/word-search/",
  description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid constructed from sequentially adjacent cells.\n\nExample:\nInput: board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'\nOutput: true",
  intuition: "Start DFS from every cell matching word[0]. At each step, if board[r][c] matches word[idx], mark it visited (e.g. board[r][c] = '#'), recurse in 4 directions for word[idx + 1], then restore the cell during backtracking.",
  approach: "1. Iterate each cell (r, c). If board[r][c] == word[0] and dfs(r, c, 0), return true.\n2. DFS helper(r, c, idx):\n   - If idx == word.length(), return true.\n   - If out of bounds or board[r][c] != word[idx], return false.\n   - Save char temp = board[r][c]; board[r][c] = '#'.\n   - found = dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) || dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1).\n   - board[r][c] = temp; return found.",
  javaSolution: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word.charAt(0) && dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(idx)) {
            return false;
        }

        char temp = board[r][c];
        board[r][c] = '#'; // mark visited in-place

        boolean found = dfs(board, word, r + 1, c, idx + 1)
                     || dfs(board, word, r - 1, c, idx + 1)
                     || dfs(board, word, r, c + 1, idx + 1)
                     || dfs(board, word, r, c - 1, idx + 1);

        board[r][c] = temp; // backtrack
        return found;
    }
}`,
  complexity: { time: "O(m * n * 3^L) where L is word length", space: "O(L) recursion stack" },
  simpleExplanation: "1. Search for the first letter anywhere on the board.\n2. Move in 4 directions matching the next letters.\n3. Temporarily mark the current square '#' so you don't reuse it in the same word.\n4. Restore the square as you backtrack.",
  hints: ["In-place marking with '#' avoids visited array", "Backtrack by restoring board[r][c] = temp", "Short-circuit || returns immediately on success"],
  interviewNotes: ["Notice branching factor is 3 (not 4) because we never backtrack to the cell we just came from", "In-place board mutation board[r][c] = '#' saves memory", "Compare with Word Search II (uses Trie for multiple words)"],
  oneLineAnswer: "DFS from matching start cells, marking visited in-place with '#', searching 4 directions, and restoring on backtrack.",
  edgeCases: ["Single cell board", "Word longer than total grid cells", "Word uses all cells"],
  similar: [{id: 212, title: "Word Search II"}]
},

// ─── BINARY SEARCH ──────────────────────────────────────────────────────────
{
  id: 35, title: "Search Insert Position", topic: "Binary Search", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/search-insert-position/",
  description: "Given a sorted array of distinct integers and a target value, return the index if target is found. If not, return the index where it would be if inserted in order.\n\nExample:\nInput: nums = [1,3,5,6], target = 5\nOutput: 2\nInput: nums = [1,3,5,6], target = 2\nOutput: 1",
  intuition: "Standard binary search. When the loop terminates (low > high), low points to the exact insertion index for target.",
  approach: "1. low = 0, high = nums.length - 1.\n2. While low <= high:\n   - mid = low + (high - low) / 2.\n   - If nums[mid] == target, return mid.\n   - If nums[mid] < target, low = mid + 1.\n   - Else high = mid - 1.\n3. Return low.",
  javaSolution: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return low; // low is the insertion point
    }
}`,
  complexity: { time: "O(log n)", space: "O(1)" },
  simpleExplanation: "1. Run normal binary search.\n2. If you find the target, return its index.\n3. If target isn't there, pointer low will naturally stop right where target belongs.",
  hints: ["Standard binary search template", "Return low on loop exit", "low + (high - low) / 2 prevents overflow"],
  interviewNotes: ["Canonical binary search problem", "Key takeaway: when binary search misses, low points to the smallest element > target (lower_bound)", "All elements are distinct and sorted"],
  oneLineAnswer: "Standard binary search returning mid on match, or low as the insertion position upon loop exit.",
  edgeCases: ["Target smaller than all elements (returns 0)", "Target larger than all elements (returns nums.length)", "Target in array"],
  similar: [{id: 74, title: "Search a 2D Matrix"}, {id: 34, title: "Find First and Last Position"}]
},
{
  id: 162, title: "Find Peak Element", topic: "Binary Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/find-peak-element/",
  description: "A peak element is an element that is strictly greater than its neighbors. Given an array nums, find a peak element and return its index in O(log n) time.\n\nExample:\nInput: nums = [1,2,3,1]\nOutput: 2",
  intuition: "Binary search on unsorted array! If nums[mid] < nums[mid + 1], an upward slope means a peak is guaranteed to exist to the right. If nums[mid] > nums[mid + 1], a downward slope means a peak is at mid or to the left.",
  approach: "1. low = 0, high = nums.length - 1.\n2. While low < high:\n   - mid = low + (high - low) / 2.\n   - If nums[mid] < nums[mid + 1]: low = mid + 1 (climb uphill to the right).\n   - Else: high = mid (peak is at mid or left).\n3. Return low.",
  javaSolution: `class Solution {
    public int findPeakElement(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            // Climb uphill: a peak is guaranteed in the direction of the rise
            if (nums[mid] < nums[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}`,
  complexity: { time: "O(log n)", space: "O(1)" },
  simpleExplanation: "1. Look at mid and mid + 1.\n2. If it's going up, follow the slope uphill to the right.\n3. If it's going down, a peak must be at mid or to the left.\n4. You will converge on a peak.",
  hints: ["Binary search without a fully sorted array", "Always step towards the higher neighbor", "Loop condition low < high, with high = mid"],
  interviewNotes: ["Why does binary search work on unsorted array? Moving uphill guarantees hitting a local maximum since boundaries are -infinity", "Notice loop condition is low < high, terminating with low == high", "Any peak is acceptable"],
  oneLineAnswer: "Binary search uphill: if nums[mid] < nums[mid+1] search right (low = mid+1), else search left (high = mid).",
  edgeCases: ["Array strictly increasing: peak is last element", "Array strictly decreasing: peak is first element", "Single element array"],
  similar: [{id: 852, title: "Peak Index in a Mountain Array"}]
},
{
  id: 33, title: "Search in Rotated Sorted Array", topic: "Binary Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  description: "Given a sorted array rotated at an unknown pivot and target, return index of target, or -1 if not found in O(log n) time.\n\nExample:\nInput: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
  intuition: "In any rotated sorted array, splitting at mid always leaves at least one half normally sorted. Check if target lies within the sorted half; if so, search there, else search the other half.",
  approach: "1. low = 0, high = n - 1.\n2. While low <= high:\n   - mid = low + (high - low) / 2.\n   - If nums[mid] == target, return mid.\n   - If left half is sorted (nums[low] <= nums[mid]):\n     - If target >= nums[low] && target < nums[mid]: high = mid - 1.\n     - Else: low = mid + 1.\n   - Else (right half is sorted):\n     - If target > nums[mid] && target <= nums[high]: low = mid + 1.\n     - Else: high = mid - 1.\n3. Return -1.",
  javaSolution: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            // Check which half is normally sorted
            if (nums[low] <= nums[mid]) { // left half is sorted
                if (target >= nums[low] && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else { // right half is sorted
                if (target > nums[mid] && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
}`,
  complexity: { time: "O(log n)", space: "O(1)" },
  simpleExplanation: "1. Split at the middle.\n2. At least one half is always cleanly sorted.\n3. Check if target falls inside the cleanly sorted range.\n4. If yes, search that half. If no, search the other half.",
  hints: ["At least one half is always sorted", "Check nums[low] <= nums[mid] to identify sorted half", "Bound check target in the sorted half"],
  interviewNotes: ["Fundamental modified binary search question", "Notice <= in nums[low] <= nums[mid] handles two-element arrays where low == mid", "Strictly O(log n) because half the search space is discarded every step"],
  oneLineAnswer: "Identify which half (left or right) is sorted, check if target lies within that sorted range, and discard the other half.",
  edgeCases: ["Array not rotated at all", "Single element match/miss", "Two elements"],
  similar: [{id: 81, title: "Search in Rotated Sorted Array II"}, {id: 153, title: "Find Minimum in Rotated Sorted Array"}]
},
{
  id: 34, title: "Find First and Last Position of Element in Sorted Array", topic: "Binary Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
  description: "Given a sorted array of integers nums, find the starting and ending position of a given target value in O(log n) time. If not found, return [-1, -1].\n\nExample:\nInput: nums = [5,7,7,8,8,10], target = 8\nOutput: [3,4]",
  intuition: "Run two separate binary searches: one biased to search left for the first occurrence, and one biased to search right for the last occurrence.",
  approach: "1. Helper findBound(isFirst):\n   - When nums[mid] == target:\n     - If isFirst: high = mid - 1 (keep searching left).\n     - Else: low = mid + 1 (keep searching right).\n     - Record ans = mid.\n2. Return [findBound(true), findBound(false)].",
  javaSolution: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return new int[]{-1, -1};
        int last = findBound(nums, target, false);
        return new int[]{first, last};
    }

    private int findBound(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1, ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                ans = mid;
                if (isFirst) high = mid - 1; // keep looking left
                else low = mid + 1;          // keep looking right
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`,
  complexity: { time: "O(log n)", space: "O(1)" },
  simpleExplanation: "1. Run binary search once to find the very first matching index (push left when matching).\n2. If not found, return [-1, -1].\n3. Run binary search again to find the very last matching index (push right when matching).",
  hints: ["Two binary searches: one for lower bound, one for upper bound", "When target matches, record index and continue searching", "isFirst flag toggles high = mid - 1 vs low = mid + 1"],
  interviewNotes: ["Reusing a single helper function with a boolean flag keeps code DRY", "Early exit: if first occurrence is -1, skip second search", "O(log n) time guaranteed"],
  oneLineAnswer: "Two binary searches: when nums[mid] == target, record index and search left for first occurrence, right for last occurrence.",
  edgeCases: ["Target not in array: [-1, -1]", "Single element matching: [0, 0]", "All elements equal target"],
  similar: [{id: 35, title: "Search Insert Position"}]
},
{
  id: 153, title: "Find Minimum in Rotated Sorted Array", topic: "Binary Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
  description: "Given the sorted rotated array nums of unique elements, return the minimum element in O(log n) time.\n\nExample:\nInput: nums = [3,4,5,1,2]\nOutput: 1",
  intuition: "Compare nums[mid] with nums[high]. If nums[mid] > nums[high], the pivot (minimum element) must be strictly to the right. If nums[mid] < nums[high], the minimum is at mid or to its left.",
  approach: "1. low = 0, high = nums.length - 1.\n2. While low < high:\n   - mid = low + (high - low) / 2.\n   - If nums[mid] > nums[high]: low = mid + 1.\n   - Else: high = mid.\n3. Return nums[low].",
  javaSolution: `class Solution {
    public int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            // If mid is greater than high, the inflection drop is in the right half
            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid; // mid could be the minimum
            }
        }
        return nums[low];
    }
}`,
  complexity: { time: "O(log n)", space: "O(1)" },
  simpleExplanation: "1. Compare the middle element to the rightmost element.\n2. If mid is bigger than right, the cliff (smallest number) must be on the right.\n3. If mid is smaller, the smallest number is at mid or to the left.\n4. When pointers converge, you're at the minimum.",
  hints: ["Compare nums[mid] with nums[high]", "If nums[mid] > nums[high], low = mid + 1", "If nums[mid] <= nums[high], high = mid"],
  interviewNotes: ["Notice we compare with nums[high], not nums[low]", "loop condition is low < high, ending at low == high", "Strictly O(log n) with unique elements"],
  oneLineAnswer: "Compare nums[mid] with nums[high]: if mid > high, search right (low = mid+1); else search left (high = mid).",
  edgeCases: ["Array not rotated at all (already sorted)", "Single element array", "Two elements"],
  similar: [{id: 33, title: "Search in Rotated Sorted Array"}, {id: 154, title: "Find Minimum in Rotated Sorted Array II"}]
},
{
  id: 4, title: "Median of Two Sorted Arrays", topic: "Binary Search", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  description: "Given two sorted arrays nums1 and nums2 of size m and n, return the median of the two sorted arrays in O(log(min(m, n))) time.\n\nExample:\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.0",
  intuition: "Partition both arrays such that the combined left half has the same size as the combined right half, and all elements in left are <= elements in right. Binary search the partition cut on the smaller array.",
  approach: "1. Ensure nums1 is the smaller array (swap if needed).\n2. Binary search cut i in nums1 [0, m]. Corresponding cut in nums2 is j = (m + n + 1) / 2 - i.\n3. Identify boundary elements: maxLeft1, minRight1, maxLeft2, minRight2 (handle -inf / +inf at boundaries).\n4. If maxLeft1 <= minRight2 && maxLeft2 <= minRight1: correct partition found!\n   - If total length odd: return max(maxLeft1, maxLeft2).\n   - Else return (max(left) + min(right)) / 2.0.\n5. If maxLeft1 > minRight2, cut too far right: high = i - 1.\n6. Else cut too far left: low = i + 1.",
  javaSolution: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);

        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;

        while (low <= high) {
            int i = (low + high) / 2;
            int j = (m + n + 1) / 2 - i;

            int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                // Correct partition achieved
                if ((m + n) % 2 == 1) {
                    return Math.max(maxLeft1, maxLeft2);
                } else {
                    return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
                }
            } else if (maxLeft1 > minRight2) {
                high = i - 1; // cut too far right in nums1
            } else {
                low = i + 1;  // cut too far left in nums1
            }
        }
        return 0.0;
    }
}`,
  complexity: { time: "O(log(min(m, n)))", space: "O(1)" },
  simpleExplanation: "1. Partition both arrays into left and right halves simultaneously.\n2. Binary search on the shorter array to find the exact cut where everything on the left is <= everything on the right.\n3. The median is then derived directly from the partition boundaries.",
  hints: ["Always binary search on the shorter array", "Left partition count: (m + n + 1) / 2", "Use Integer.MIN_VALUE / MAX_VALUE for edge boundaries"],
  interviewNotes: ["Binary search on partition cut rather than values", "The gold standard Hard binary search problem", "O(log(min(m,n))) is strictly faster than merging O(m+n)"],
  oneLineAnswer: "Binary search the partition cut on the shorter array so left half elements are <= right half elements in O(log(min(m,n))).",
  edgeCases: ["One array is empty", "No overlapping values", "Odd vs even combined lengths"],
  similar: []
},
{
  id: 69, title: "Sqrt(x)", topic: "Binary Search", difficulty: "Easy",
  leetcodeUrl: "https://leetcode.com/problems/sqrtx/",
  description: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer without using built-in exponent functions.\n\nExample:\nInput: x = 8\nOutput: 2",
  intuition: "Binary search in range [1, x]. Compare mid * mid with x. Use division mid <= x / mid to prevent integer multiplication overflow.",
  approach: "1. If x < 2, return x.\n2. low = 1, high = x / 2, ans = 1.\n3. While low <= high:\n   - mid = low + (high - low) / 2.\n   - If mid <= x / mid: ans = mid, low = mid + 1.\n   - Else: high = mid - 1.\n4. Return ans.",
  javaSolution: `class Solution {
    public int mySqrt(int x) {
        if (x < 2) return x;
        int low = 1, high = x / 2, ans = 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            // Use division mid <= x / mid to prevent mid * mid integer overflow
            if (mid <= x / mid) {
                ans = mid;
                low = mid + 1; // try larger square
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}`,
  complexity: { time: "O(log x)", space: "O(1)" },
  simpleExplanation: "1. Binary search between 1 and x / 2.\n2. Check if mid squared is <= x.\n3. To avoid overflow, check mid <= x / mid.\n4. Return the largest mid that fits.",
  hints: ["mid <= x / mid avoids integer overflow", "high can be initialized to x / 2 for x >= 2", "Record ans whenever mid <= x / mid"],
  interviewNotes: ["Critical trap: mid * mid will overflow a 32-bit integer when mid > 46340 -> use mid <= x / mid", "Newton's method is an alternative mathematical approach", "Rounded down (floor) requirement"],
  oneLineAnswer: "Binary search in [1, x/2] using mid <= x / mid to prevent overflow, recording the largest valid mid.",
  edgeCases: ["x = 0: return 0", "x = 1: return 1", "x = Integer.MAX_VALUE"],
  similar: [{id: 50, title: "Pow(x, n)"}, {id: 367, title: "Valid Perfect Square"}]
},
{
  id: 300, title: "Longest Increasing Subsequence", topic: "Binary Search", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
  description: "Given an integer array nums, return the length of the longest strictly increasing subsequence in O(n log n) time.\n\nExample:\nInput: nums = [10,9,2,5,3,7,101,18]\nOutput: 4 ([2,3,7,101])",
  intuition: "Patience sorting / tails array: maintain tails where tails[i] is the smallest tail of all increasing subsequences of length i + 1. For each x, binary search its insertion position in tails.",
  approach: "1. int[] tails = new int[nums.length], len = 0.\n2. For each x in nums:\n   - Binary search insertion index i of x in tails[0..len-1].\n   - tails[i] = x.\n   - If i == len, len++.\n3. Return len.",
  javaSolution: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int len = 0;

        for (int x : nums) {
            int low = 0, high = len;
            while (low < high) {
                int mid = low + (high - low) / 2;
                if (tails[mid] < x) low = mid + 1;
                else high = mid;
            }
            tails[low] = x;
            if (low == len) len++;
        }
        return len;
    }
}`,
  complexity: { time: "O(n log n)", space: "O(n)" },
  simpleExplanation: "1. Keep a list tails that stores the smallest ending numbers for increasing sequences of each length.\n2. For each number, binary search where it belongs in tails.\n3. If it's bigger than all ends, extend the list. Otherwise, update the smallest tail.",
  hints: ["tails[i] stores smallest tail of all LIS of length i + 1", "Binary search insertion position for each element", "O(n log n) patience sorting"],
  interviewNotes: ["O(n²) DP is easy, but O(n log n) with patience sorting is what FAANG expects", "Notice tails does NOT store the actual LIS, only its optimal tail candidates", "Strictly increasing requires < (not <=)"],
  oneLineAnswer: "Patience sort: maintain tails array with binary search, replacing the first element >= x or extending length in O(n log n).",
  edgeCases: ["Strictly decreasing array: LIS = 1", "Already sorted array: LIS = n", "All duplicate elements: LIS = 1"],
  similar: [{id: 354, title: "Russian Doll Envelopes"}]
},

// ─── HEAP / PRIORITY QUEUE ──────────────────────────────────────────────────
{
  id: 215, title: "Kth Largest Element in an Array", topic: "Heap / Priority Queue", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
  description: "Given an integer array nums and an integer k, return the kth largest element in the array in O(n) average time.\n\nExample:\nInput: nums = [3,2,1,5,6,4], k = 2\nOutput: 5",
  intuition: "Maintain a min-heap of size k. For each element, offer it into the heap; if heap size exceeds k, poll the smallest. At the end, the root of the min-heap is the kth largest element.",
  approach: "1. PriorityQueue<Integer> minHeap = new PriorityQueue<>(k).\n2. For each num in nums:\n   - minHeap.offer(num).\n   - If minHeap.size() > k, minHeap.poll().\n3. Return minHeap.peek().",
  javaSolution: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
        for (int x : nums) {
            minHeap.offer(x);
            if (minHeap.size() > k) {
                minHeap.poll(); // evict smallest, keeping only top k largest
            }
        }
        return minHeap.peek();
    }
}`,
  complexity: { time: "O(n log k)", space: "O(k)" },
  simpleExplanation: "1. Keep a min-heap that holds at most k elements.\n2. Whenever the heap exceeds k items, kick out the smallest one.\n3. The smallest element left in the heap is the kth largest overall.",
  hints: ["Min-heap of size k", "Evict when size > k", "Alternative: Quickselect for O(n) average"],
  interviewNotes: ["Quickselect gives O(n) average, but Min-heap O(n log k) is guaranteed without worst-case O(n²) pitfalls", "Min-heap peek() is the kth largest", "Standard top-k pattern"],
  oneLineAnswer: "Maintain a min-heap of size k: poll when size > k; peek() is the kth largest element.",
  edgeCases: ["k = 1 (maximum element)", "k = nums.length (minimum element)", "Duplicate elements"],
  similar: [{id: 347, title: "Top K Frequent Elements"}]
},
{
  id: 502, title: "IPO", topic: "Heap / Priority Queue", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/ipo/",
  description: "Given capital w, at most k distinct projects, and arrays profits and capital, pick at most k projects to maximize total final capital.\n\nExample:\nInput: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]\nOutput: 4",
  intuition: "Sort projects by required capital. Use a max-heap of profits. While we can afford projects (capital <= w), add their profits to the max-heap. Greedily pick the project with maximum profit from the heap and add to w. Repeat k times.",
  approach: "1. Pair projects into int[n][2] = {capital, profit} and sort by capital ascending.\n2. PriorityQueue<Integer> maxProfit = new PriorityQueue<>(Collections.reverseOrder()).\n3. ptr = 0.\n4. Loop k times:\n   - While ptr < n && projects[ptr][0] <= w: maxProfit.offer(projects[ptr++][1]).\n   - If maxProfit is empty, break (cannot afford any more projects).\n   - w += maxProfit.poll().\n5. Return w.",
  javaSolution: `class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        int[][] projects = new int[n][2];
        for (int i = 0; i < n; i++) {
            projects[i][0] = capital[i];
            projects[i][1] = profits[i];
        }
        Arrays.sort(projects, (a, b) -> Integer.compare(a[0], b[0])); // sort by required capital

        PriorityQueue<Integer> maxProfit = new PriorityQueue<>(Collections.reverseOrder());
        int ptr = 0;

        for (int i = 0; i < k; i++) {
            // Push all projects we can currently afford into the max-heap
            while (ptr < n && projects[ptr][0] <= w) {
                maxProfit.offer(projects[ptr][1]);
                ptr++;
            }
            if (maxProfit.isEmpty()) break; // cannot afford any more projects
            w += maxProfit.poll(); // greedily pick highest profit
        }
        return w;
    }
}`,
  complexity: { time: "O(n log n + k log n)", space: "O(n)" },
  simpleExplanation: "1. Sort projects by required start-up capital.\n2. Whenever our current capital allows us to afford projects, put their profits in a max-heap.\n3. Greedily pick the highest-profit project from the heap to boost capital.\n4. Repeat k times.",
  hints: ["Sort by capital ascending", "Max-heap for available profits", "Greedily take max profit available"],
  interviewNotes: ["Two-heap/sorting greedy strategy", "ptr moves forward across all k iterations (amortized O(n) insertions into heap)", "Very popular hard greedy interview question"],
  oneLineAnswer: "Sort projects by capital, add affordable project profits to max-heap, and greedily pick the maximum profit k times.",
  edgeCases: ["w = 0 cannot afford any project -> return w", "k greater than total projects", "All projects affordable from start"],
  similar: [{id: 253, title: "Meeting Rooms II"}]
},
{
  id: 373, title: "Find K Pairs with Smallest Sums", topic: "Heap / Priority Queue", difficulty: "Medium",
  leetcodeUrl: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
  description: "Given two integer arrays nums1 and nums2 sorted in ascending order and an integer k, return the k pairs (u, v) with the smallest sums.\n\nExample:\nInput: nums1 = [1,7,11], nums2 = [2,4,6], k = 3\nOutput: [[1,2],[1,4],[1,6]]",
  intuition: "Similar to merging k sorted lists. Push initial pairs (nums1[i], nums2[0]) for i in [0..min(k, nums1.length)-1] into a min-heap. When popping (nums1[i], nums2[j]), offer (nums1[i], nums2[j + 1]).",
  approach: "1. Min-heap storing int[]{sum, i, j} ordered by sum.\n2. Seed heap with (nums1[i] + nums2[0], i, 0) for i in 0..min(k, n1)-1.\n3. While !pq.isEmpty() && k-- > 0:\n   - Poll {sum, i, j}; add [nums1[i], nums2[j]] to result.\n   - If j + 1 < nums2.length: offer {nums1[i] + nums2[j+1], i, j + 1}.\n4. Return result.",
  javaSolution: `class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<List<Integer>> res = new ArrayList<>();
        if (nums1.length == 0 || nums2.length == 0 || k == 0) return res;

        // Min-heap ordered by pair sum: [sum, index_in_nums1, index_in_nums2]
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));

        // Seed with first element of nums2 paired with each of the first k elements of nums1
        for (int i = 0; i < Math.min(k, nums1.length); i++) {
            pq.offer(new int[]{nums1[i] + nums2[0], i, 0});
        }

        while (!pq.isEmpty() && k-- > 0) {
            int[] curr = pq.poll();
            int i = curr[1], j = curr[2];
            res.add(Arrays.asList(nums1[i], nums2[j]));

            if (j + 1 < nums2.length) {
                pq.offer(new int[]{nums1[i] + nums2[j + 1], i, j + 1});
            }
        }
        return res;
    }
}`,
  complexity: { time: "O(k log(min(k, n1)))", space: "O(min(k, n1))" },
  simpleExplanation: "1. Pair the first k numbers of nums1 with nums2[0] and put them in a min-heap.\n2. The top of the heap is the smallest current pair: pop it and add to result.\n3. Advance that pair's nums2 pointer (j + 1) and put the new pair into the heap.\n4. Repeat k times.",
  hints: ["Equivalent to merging k sorted lists", "Min-heap storing indices [sum, i, j]", "Only advance index in nums2 upon polling"],
  interviewNotes: ["Avoids calculating all m * n pairs (which would be O(m*n))", "Heap size never exceeds min(k, nums1.length)", "Notice tie-breaking and bounds check j + 1 < nums2.length"],
  oneLineAnswer: "Seed min-heap with (nums1[i], nums2[0]), poll smallest pair, and advance nums2 index to j+1.",
  edgeCases: ["k > total possible pairs m * n", "k = 1", "Single element arrays"],
  similar: [{id: 23, title: "Merge k Sorted Lists"}]
},
{
  id: 295, title: "Find Median from Data Stream", topic: "Heap / Priority Queue", difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
  description: "The median is the middle value in an ordered integer list. Design a data structure that supports addNum(num) and findMedian() from a data stream in O(log n) and O(1) respectively.\n\nExample:\nMedianFinder mf = new MedianFinder();\nmf.addNum(1); mf.addNum(2);\nmf.findMedian(); // 1.5\nmf.addNum(3);\nmf.findMedian(); // 2.0",
  intuition: "Two heaps: a max-heap for the smaller lower half of numbers, and a min-heap for the larger upper half. Keep heaps balanced so their sizes differ by at most 1. The median is either the top of the larger heap or the average of both tops.",
  approach: "1. small (max-heap) and large (min-heap).\n2. addNum(num):\n   - small.offer(num).\n   - large.offer(small.poll()) (ensure order small <= large).\n   - If large.size() > small.size(): small.offer(large.poll()) (balance sizes: small >= large).\n3. findMedian():\n   - If small.size() > large.size(): return small.peek().\n   - Else return (small.peek() + large.peek()) / 2.0.",
  javaSolution: `class MedianFinder {
    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder()); // max-heap
    private PriorityQueue<Integer> large = new PriorityQueue<>(); // min-heap

    public MedianFinder() {}

    public void addNum(int num) {
        small.offer(num);
        large.offer(small.poll()); // ensure small elements <= large elements

        // Balance sizes: small can have at most 1 more element than large
        if (large.size() > small.size()) {
            small.offer(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        }
        return (small.peek() + large.peek()) / 2.0;
    }
}`,
  complexity: { time: "O(log n) for addNum, O(1) for findMedian", space: "O(n)" },
  simpleExplanation: "1. Split numbers into two halves: bottom half in a max-heap, top half in a min-heap.\n2. Keep both heaps balanced in size.\n3. If counts are odd, median is the top of the bigger heap.\n4. If counts are even, median is the average of both tops.",
  hints: ["Two heaps: max-heap for lower half, min-heap for upper half", "Balance heaps so size difference <= 1", "findMedian() is O(1)"],
  interviewNotes: ["Classic two-heap system design pattern", "Sifting through small then large guarantees invariant: max(small) <= min(large)", "Very popular Hard question across Meta, Google, and Amazon"],
  oneLineAnswer: "Maintain max-heap for lower half and min-heap for upper half; balance sizes so median is peek() or average of both peeks in O(1).",
  edgeCases: ["First element added", "Even number of total elements", "Duplicate numbers stream"],
  similar: [{id: 480, title: "Sliding Window Median"}]
}
];

