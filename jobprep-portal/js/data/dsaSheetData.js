// Dedicated Topic-Wise DSA Preparation Sheet
window.JobPortalData = window.JobPortalData || {};

window.JobPortalData.dsaSheet = [
  // --- TOPIC 1: ARRAYS & HASHING ---
  {
    id: "dsa-1",
    title: "Two Sum",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
    companies: ["Amazon", "Google", "Microsoft", "TCS Digital", "Infosys"],
    intuition: "Use a hash map to store each visited number and its index. For every element x, check if (target - x) already exists in the map in O(1) time.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeCpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.count(complement)) return {mp[complement], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
    codeJava: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) return new int[] { map.get(complement), i };
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
    codePython: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`
  },
  {
    id: "dsa-2",
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    companies: ["Amazon", "Microsoft", "Accenture", "Infosys"],
    intuition: "Track the minimum purchase price seen so far. At each day, calculate the potential profit if sold today and update the maximum profit.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int p : prices) {
        minPrice = min(minPrice, p);
        maxProfit = max(maxProfit, p - minPrice);
    }
    return maxProfit;
}`,
    codeJava: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, maxProfit = 0;
    for (int p : prices) {
        minPrice = Math.min(minPrice, p);
        maxProfit = Math.max(maxProfit, p - minPrice);
    }
    return maxProfit;
}`,
    codePython: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for p in prices:
        min_price = min(min_price, p)
        max_profit = max(max_profit, p - min_price)
    return max_profit`
  },
  {
    id: "dsa-3",
    title: "Maximum Subarray (Kadane's Algorithm)",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-subarray/",
    companies: ["Google", "Amazon", "Microsoft", "TCS Prime", "Cognizant"],
    intuition: "Kadane's Algorithm: Maintain a running currentSum. If currentSum falls below 0, reset it to 0. Update global maxSum at every element.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], curr = 0;
    for (int x : nums) {
        curr = max(x, curr + x);
        maxSum = max(maxSum, curr);
    }
    return maxSum;
}`,
    codeJava: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0], curr = 0;
    for (int x : nums) {
        curr = Math.max(x, curr + x);
        maxSum = Math.max(maxSum, curr);
    }
    return maxSum;
}`,
    codePython: `def maxSubArray(nums: list[int]) -> int:
    max_sum = nums[0]
    curr = 0
    for x in nums:
        curr = max(x, curr + x)
        max_sum = max(max_sum, curr)
    return max_sum`
  },
  {
    id: "dsa-4",
    title: "Merge Intervals",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/merge-intervals/",
    companies: ["Google", "Amazon", "Facebook", "Goldman Sachs"],
    intuition: "Sort intervals by start time. Iterate through sorted intervals; if current interval starts before or when previous ends, merge by updating end time.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    codeCpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    for (auto& interval : intervals) {
        if (res.empty() || res.back()[1] < interval[0]) {
            res.push_back(interval);
        } else {
            res.back()[1] = max(res.back()[1], interval[1]);
        }
    }
    return res;
}`,
    codeJava: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> res = new ArrayList<>();
    for (int[] interval : intervals) {
        if (res.isEmpty() || res.get(res.size() - 1)[1] < interval[0]) {
            res.add(interval);
        } else {
            res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], interval[1]);
        }
    }
    return res.toArray(new int[res.size()][]);
}`,
    codePython: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    res = []
    for interval in intervals:
        if not res or res[-1][1] < interval[0]:
            res.append(interval)
        else:
            res[-1][1] = max(res[-1][1], interval[1])
    return res`
  },
  {
    id: "dsa-5",
    title: "Product of Array Except Self",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    companies: ["Amazon", "Microsoft", "Uber", "Adobe"],
    intuition: "Compute prefix products in a first pass. Then compute suffix products on-the-fly in a second pass from right to left, multiplying into the result array.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) extra space",
    codeCpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}`,
    codeJava: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    res[0] = 1;
    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}`,
    codePython: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    for i in range(1, n):
        res[i] = res[i - 1] * nums[i - 1]
    right = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right
        right *= nums[i]
    return res`
  },

  // --- TOPIC 2: TWO POINTERS & STRINGS ---
  {
    id: "dsa-6",
    title: "Valid Palindrome",
    topic: "Two Pointers & Strings",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-palindrome/",
    companies: ["Microsoft", "Facebook", "TCS", "Accenture"],
    intuition: "Use two pointers from left and right. Skip non-alphanumeric characters. Compare lowercased characters until pointers meet.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) return false;
        l++; r--;
    }
    return true;
}`,
    codeJava: `public boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
        while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
        l++; r--;
    }
    return true;
}`,
    codePython: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l += 1; r -= 1
    return True`
  },
  {
    id: "dsa-7",
    title: "Longest Substring Without Repeating Characters",
    topic: "Two Pointers & Strings",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    companies: ["Amazon", "Google", "Bloomberg", "Infosys"],
    intuition: "Use a sliding window with a hash map of last seen indices. When a duplicate character appears inside current window, jump the left pointer right past it.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, m))",
    codeCpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> mp;
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.size(); right++) {
        if (mp.count(s[right]) && mp[s[right]] >= left) {
            left = mp[s[right]] + 1;
        }
        mp[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    codeJava: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c) && map.get(c) >= left) {
            left = map.get(c) + 1;
        }
        map.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    codePython: `def lengthOfLongestSubstring(s: str) -> int:
    seen = {}
    max_len = 0
    left = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`
  },
  {
    id: "dsa-8",
    title: "Trapping Rain Water",
    topic: "Two Pointers & Strings",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/trapping-rain-water/",
    companies: ["Google", "Amazon", "Goldman Sachs", "Microsoft"],
    intuition: "Maintain left and right pointers with maxLeft and maxRight. The water trapped is bounded by the smaller of the two boundary heights.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `int trap(vector<int>& height) {
    int l = 0, r = height.size() - 1;
    int maxL = 0, maxR = 0, water = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            if (height[l] >= maxL) maxL = height[l];
            else water += maxL - height[l];
            l++;
        } else {
            if (height[r] >= maxR) maxR = height[r];
            else water += maxR - height[r];
            r--;
        }
    }
    return water;
}`,
    codeJava: `public int trap(int[] height) {
    int l = 0, r = height.length - 1;
    int maxL = 0, maxR = 0, water = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            if (height[l] >= maxL) maxL = height[l];
            else water += maxL - height[l];
            l++;
        } else {
            if (height[r] >= maxR) maxR = height[r];
            else water += maxR - height[r];
            r--;
        }
    }
    return water;
}`,
    codePython: `def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    max_l, max_r = 0, 0
    water = 0
    while l < r:
        if height[l] <= height[r]:
            if height[l] >= max_l: max_l = height[l]
            else: water += max_l - height[l]
            l += 1
        else:
            if height[r] >= max_r: max_r = height[r]
            else: water += max_r - height[r]
            r -= 1
    return water`
  },

  // --- TOPIC 3: LINKED LISTS ---
  {
    id: "dsa-9",
    title: "Reverse a Linked List",
    topic: "Linked Lists",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-linked-list/",
    companies: ["Amazon", "Microsoft", "TCS", "Wipro", "Cognizant"],
    intuition: "Iteratively reverse pointers using three pointers: prev (null), curr (head), and next (curr.next). Point curr.next to prev.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    codeJava: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    codePython: `def reverseList(head: ListNode) -> ListNode:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`
  },
  {
    id: "dsa-10",
    title: "Linked List Cycle (Floyd's Tortoise and Hare)",
    topic: "Linked Lists",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/linked-list-cycle/",
    companies: ["Amazon", "Microsoft", "Accenture", "Infosys"],
    intuition: "Use slow and fast pointers. Fast moves two steps, slow moves one step. If a cycle exists, they will eventually meet.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    codeJava: `public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
    codePython: `def hasCycle(head: ListNode) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`
  },
  {
    id: "dsa-11",
    title: "LRU Cache",
    topic: "Linked Lists",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/lru-cache/",
    companies: ["Google", "Amazon", "Microsoft", "Paytm", "Swiggy"],
    intuition: "Combine a Doubly Linked List with a Hash Map. Hash map provides O(1) lookup to nodes; Doubly Linked List enables O(1) insertion at head and removal from tail.",
    timeComplexity: "O(1) get & put",
    spaceComplexity: "O(capacity)",
    codeCpp: `class LRUCache {
    int cap;
    list<pair<int, int>> lru;
    unordered_map<int, list<pair<int, int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!mp.count(key)) return -1;
        lru.splice(lru.begin(), lru, mp[key]);
        return mp[key]->second;
    }
    void put(int key, int value) {
        if (mp.count(key)) {
            lru.splice(lru.begin(), lru, mp[key]);
            mp[key]->second = value;
            return;
        }
        if (lru.size() == cap) {
            mp.erase(lru.back().first);
            lru.pop_back();
        }
        lru.push_front({key, value});
        mp[key] = lru.begin();
    }
};`,
    codeJava: `class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    public void put(int key, int value) {
        super.put(key, value);
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
    codePython: `class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = collections.OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`
  },

  // --- TOPIC 4: STACKS & QUEUES ---
  {
    id: "dsa-12",
    title: "Valid Parentheses",
    topic: "Stacks & Queues",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-parentheses/",
    companies: ["Amazon", "Microsoft", "TCS", "Wipro"],
    intuition: "Use a stack. Push opening brackets. When a closing bracket arrives, verify stack is non-empty and top element matches the corresponding opening bracket.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeCpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
    codeJava: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`,
    codePython: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`
  },
  {
    id: "dsa-13",
    title: "Next Greater Element I",
    topic: "Stacks & Queues",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/next-greater-element-i/",
    companies: ["Amazon", "Flipkart", "Accenture"],
    intuition: "Monotonic decreasing stack: Traverse array from right to left (or left to right). Maintain elements in descending order on stack to find immediate greater item in O(1) amortized.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeCpp: `vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    unordered_map<int, int> mp;
    stack<int> st;
    for (int num : nums2) {
        while (!st.empty() && st.top() < num) {
            mp[st.top()] = num;
            st.pop();
        }
        st.push(num);
    }
    vector<int> res;
    for (int num : nums1) res.push_back(mp.count(num) ? mp[num] : -1);
    return res;
}`,
    codeJava: `public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    Map<Integer, Integer> map = new HashMap<>();
    Stack<Integer> stack = new Stack<>();
    for (int num : nums2) {
        while (!stack.isEmpty() && stack.peek() < num) {
            map.put(stack.pop(), num);
        }
        stack.push(num);
    }
    int[] res = new int[nums1.length];
    for (int i = 0; i < nums1.length; i++) {
        res[i] = map.getOrDefault(nums1[i], -1);
    }
    return res;
}`,
    codePython: `def nextGreaterElement(nums1: list[int], nums2: list[int]) -> list[int]:
    stack, mapping = [], {}
    for num in nums2:
        while stack and stack[-1] < num:
            mapping[stack.pop()] = num
        stack.append(num)
    return [mapping.get(num, -1) for num in nums1]`
  },

  // --- TOPIC 5: BINARY TREES & BST ---
  {
    id: "dsa-14",
    title: "Maximum Depth of Binary Tree",
    topic: "Binary Trees & BST",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    companies: ["Microsoft", "Google", "Infosys", "TCS"],
    intuition: "Recursive DFS: depth of a node is 1 + max(depth of left, depth of right). Base case: empty node has depth 0.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h is tree height",
    codeCpp: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
    codeJava: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    codePython: `def maxDepth(root: Optional[TreeNode]) -> int:
    if not root: return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`
  },
  {
    id: "dsa-15",
    title: "Lowest Common Ancestor of a Binary Tree",
    topic: "Binary Trees & BST",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    companies: ["Amazon", "Facebook", "Microsoft", "Adobe"],
    intuition: "Recursively search left and right subtrees. If current root matches p or q, return root. If both left and right return non-null, root is LCA.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    codeCpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
    codeJava: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`,
    codePython: `def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root
    return left or right`
  },
  {
    id: "dsa-16",
    title: "Validate Binary Search Tree",
    topic: "Binary Trees & BST",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/validate-binary-search-tree/",
    companies: ["Amazon", "Bloomberg", "Google", "Infosys"],
    intuition: "Maintain valid min and max boundaries for each node during DFS recursion. Left child must be in (minVal, node.val) and right child in (node.val, maxVal).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    codeCpp: `bool isValidBST(TreeNode* root, long minVal = LONG_MIN, long maxVal = LONG_MAX) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return isValidBST(root->left, minVal, root->val) && isValidBST(root->right, root->val, maxVal);
}`,
    codeJava: `public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
private boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
}`,
    codePython: `def isValidBST(root: Optional[TreeNode]) -> bool:
    def validate(node, low=-float('inf'), high=float('inf')):
        if not node: return True
        if not (low < node.val < high): return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root)`
  },

  // --- TOPIC 6: DYNAMIC PROGRAMMING ---
  {
    id: "dsa-17",
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/climbing-stairs/",
    companies: ["Amazon", "Uber", "TCS", "Accenture"],
    intuition: "Fibonacci recurrence: To reach step n, one can jump from (n-1) or (n-2). dp[i] = dp[i-1] + dp[i-2]. Optimize space using two variables.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
    codeJava: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
    codePython: `def climbStairs(n: int) -> int:
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`
  },
  {
    id: "dsa-18",
    title: "Coin Change (Fewest Coins)",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/coin-change/",
    companies: ["Amazon", "Microsoft", "Goldman Sachs", "Infosys"],
    intuition: "Bottom-up 1D DP: dp[i] represents min coins to make amount i. dp[i] = min(dp[i], 1 + dp[i - coin]) for each coin <= i.",
    timeComplexity: "O(amount * coins.length)",
    spaceComplexity: "O(amount)",
    codeCpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i >= c) dp[i] = min(dp[i], 1 + dp[i - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    codeJava: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i >= c) dp[i] = Math.min(dp[i], 1 + dp[i - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    codePython: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i >= c:
                dp[i] = min(dp[i], 1 + dp[i - c])
    return dp[amount] if dp[amount] != float('inf') else -1`
  },
  {
    id: "dsa-19",
    title: "Longest Increasing Subsequence (LIS)",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-increasing-subsequence/",
    companies: ["Google", "Amazon", "Microsoft"],
    intuition: "Binary search with Patience Sorting (tails array). For each num, find position using lower_bound. If exceeds max, append; else overwrite.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    codeCpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
    codeJava: `public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
        int idx = Collections.binarySearch(tails, x);
        if (idx < 0) idx = -(idx + 1);
        if (idx == tails.size()) tails.add(x);
        else tails.set(idx, x);
    }
    return tails.size();
}`,
    codePython: `import bisect
def lengthOfLIS(nums: list[int]) -> int:
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`
  },

  // --- TOPIC 7: GRAPHS ---
  {
    id: "dsa-20",
    title: "Number of Islands",
    topic: "Graphs",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/number-of-islands/",
    companies: ["Amazon", "Google", "Bloomberg", "Flipkart"],
    intuition: "Grid traversal: Iterate each cell. When land ('1') is encountered, increment island count and trigger BFS/DFS to sink all connected land to '0'.",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    codeCpp: `void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c); dfs(grid, r - 1, c);
    dfs(grid, r, c + 1); dfs(grid, r, c - 1);
}
int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int i = 0; i < grid.size(); i++) {
        for (int j = 0; j < grid[0].size(); j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}`,
    codeJava: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}
private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);
}`,
    codePython: `def numIslands(grid: list[list[str]]) -> int:
    if not grid: return 0
    m, n = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    return count`
  },
  {
    id: "dsa-21",
    title: "Course Schedule (Topological Sort / Cycle Detection)",
    topic: "Graphs",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/course-schedule/",
    companies: ["Amazon", "Google", "Uber", "Microsoft"],
    intuition: "Kahn's Algorithm (BFS) with in-degrees. Add courses with 0 in-degree to queue. Pop course, decrement in-degree of neighbors. If processed courses == numCourses, valid.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    codeCpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<int> inDegree(numCourses, 0);
    vector<vector<int>> adj(numCourses);
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);
    int count = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        count++;
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    return count == numCourses;
}`,
    codeJava: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    int[] inDegree = new int[numCourses];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] p : prerequisites) {
        adj.get(p[1]).add(p[0]);
        inDegree[p[0]]++;
    }
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);
    int count = 0;
    while (!q.isEmpty()) {
        int u = q.poll();
        count++;
        for (int v : adj.get(u)) {
            if (--inDegree[v] == 0) q.add(v);
        }
    }
    return count == numCourses;
}`,
    codePython: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * numCourses
    adj = collections.defaultdict(list)
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1
    q = collections.deque([i for i in range(numCourses) if in_degree[i] == 0])
    count = 0
    while q:
        u = q.popleft()
        count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    return count == numCourses`
  },

  // --- TOPIC 8: HEAPS & PRIORITY QUEUES ---
  {
    id: "dsa-22",
    title: "Kth Largest Element in an Array",
    topic: "Heaps & Priority Queues",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    companies: ["Amazon", "Facebook", "Microsoft", "Walmart"],
    intuition: "Maintain a Min-Heap of size k. Push numbers; when size exceeds k, pop the smallest. Top of min-heap holds kth largest element.",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    codeCpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minH;
    for (int x : nums) {
        minH.push(x);
        if (minH.size() > k) minH.pop();
    }
    return minH.top();
}`,
    codeJava: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minH = new PriorityQueue<>();
    for (int x : nums) {
        minH.add(x);
        if (minH.size() > k) minH.poll();
    }
    return minH.peek();
}`,
    codePython: `import heapq
def findKthLargest(nums: list[int], k: int) -> int:
    return heapq.nlargest(k, nums)[-1]`
  },

  // --- TOPIC 9: RECURSION & BACKTRACKING ---
  {
    id: "dsa-23",
    title: "Subsets (Power Set)",
    topic: "Recursion & Backtracking",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/subsets/",
    companies: ["Amazon", "Google", "Facebook", "Infosys"],
    intuition: "Backtracking pick/don't pick decision tree or loop: at each index i, add current number, recurse for (i + 1), and backtrack by popping.",
    timeComplexity: "O(2^n * n)",
    spaceComplexity: "O(n)",
    codeCpp: `void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {
    res.push_back(curr);
    for (int i = start; i < nums.size(); i++) {
        curr.push_back(nums[i]);
        backtrack(i + 1, nums, curr, res);
        curr.pop_back();
    }
}
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> curr;
    backtrack(0, nums, curr, res);
    return res;
}`,
    codeJava: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(0, nums, new ArrayList<>(), res);
    return res;
}
private void backtrack(int start, int[] nums, List<Integer> curr, List<List<Integer>> res) {
    res.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(i + 1, nums, curr, res);
        curr.remove(curr.size() - 1);
    }
}`,
    codePython: `def subsets(nums: list[int]) -> list[list[int]]:
    res = []
    def backtrack(start, curr):
        res.append(list(curr))
        for i in range(start, len(nums)):
            curr.append(nums[i])
            backtrack(i + 1, curr)
            curr.pop()
    backtrack(0, [])
    return res`
  },

  // --- TOPIC 10: GREEDY & BIT MANIPULATION ---
  {
    id: "dsa-24",
    title: "Single Number",
    topic: "Greedy & Bit Manipulation",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/single-number/",
    companies: ["Amazon", "Google", "TCS", "Infosys"],
    intuition: "XOR properties: a ^ a = 0 and a ^ 0 = a. XORing all elements together cancels duplicate pairs, leaving the unique single number.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeCpp: `int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}`,
    codeJava: `public int singleNumber(int[] nums) {
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}`,
    codePython: `def singleNumber(nums: list[int]) -> int:
    res = 0
    for x in nums:
        res ^= x
    return res`
  }
];
